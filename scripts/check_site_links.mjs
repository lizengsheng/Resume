const cliArgs = process.argv.slice(2);
const strictExternal = cliArgs.includes("--strict-external");
const startValue = cliArgs.find((arg) => !arg.startsWith("--")) || "https://lizengsheng.github.io/Resume/";
const startUrl = new URL(startValue);
const scopePath = startUrl.pathname.endsWith("/") ? startUrl.pathname : `${startUrl.pathname}/`;
const pageQueue = [startUrl.href];
const queuedPages = new Set(pageQueue);
const pageHtml = new Map();
const discovered = new Map();
const results = new Map();
const anchors = [];

const ignoredSchemes = ["data:", "javascript:", "blob:"];
const manualSchemes = ["mailto:", "tel:"];

function isInSiteScope(url) {
  return url.origin === startUrl.origin && url.pathname.startsWith(scopePath);
}

function looksLikeHtml(url) {
  const lastPart = url.pathname.split("/").pop() || "";
  return url.pathname.endsWith("/") || url.pathname.endsWith(".html") || !lastPart.includes(".");
}

function registerLink(rawValue, sourceUrl) {
  const raw = rawValue.trim();
  if (!raw || ignoredSchemes.some((scheme) => raw.startsWith(scheme))) return;

  if (manualSchemes.some((scheme) => raw.startsWith(scheme))) {
    discovered.set(raw, { sourceUrl, kind: "manual" });
    return;
  }

  let resolved;
  try {
    resolved = new URL(raw, sourceUrl);
  } catch {
    results.set(raw, { ok: false, status: "INVALID", kind: "invalid", sourceUrl });
    return;
  }

  if (!/^https?:$/.test(resolved.protocol)) return;
  if (resolved.hash) anchors.push({ url: resolved.href, sourceUrl });
  resolved.hash = "";
  discovered.set(resolved.href, {
    sourceUrl,
    kind: isInSiteScope(resolved) ? "internal" : "external",
  });

  if (isInSiteScope(resolved) && looksLikeHtml(resolved) && !queuedPages.has(resolved.href)) {
    queuedPages.add(resolved.href);
    pageQueue.push(resolved.href);
  }
}

function extractLinks(html, sourceUrl) {
  for (const match of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
    registerLink(match[1], sourceUrl);
  }

  for (const match of html.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/gi)) {
    for (const item of match[1].split(",")) {
      registerLink(item.trim().split(/\s+/)[0], sourceUrl);
    }
  }

  for (const tag of html.matchAll(/<meta\b[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*>/gi)) {
    const content = tag[0].match(/\bcontent=["']([^"']+)["']/i)?.[1];
    if (content) registerLink(content, sourceUrl);
  }
}

async function fetchWithRetry(url, options, attempts = 1) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
        headers: {
          "user-agent": "Li-Zengsheng-Portfolio-Link-Checker/1.0",
          ...(options.headers || {}),
        },
        ...options,
      });
      if (response.status < 500 || attempt === attempts) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
  }
  throw lastError;
}

async function crawlPage(pageUrl) {
  try {
    const response = await fetchWithRetry(pageUrl, { method: "GET" }, 3);
    const contentType = response.headers.get("content-type") || "";
    const ok = response.ok && contentType.includes("text/html");
    results.set(pageUrl, {
      ok,
      status: response.status,
      kind: "internal-page",
      contentType,
    });
    if (!ok) return;

    const html = await response.text();
    pageHtml.set(pageUrl, html);
    extractLinks(html, pageUrl);
  } catch (error) {
    results.set(pageUrl, { ok: false, status: "ERROR", kind: "internal-page", error: error.message });
  }
}

async function probeTarget(url, info) {
  if (manualSchemes.some((scheme) => url.startsWith(scheme))) {
    const valid = url.startsWith("mailto:")
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url.slice("mailto:".length).split("?")[0])
      : url.length > "tel:".length;
    results.set(url, { ok: valid, status: "MANUAL", kind: info.kind, sourceUrl: info.sourceUrl });
    return;
  }

  try {
    let response = await fetchWithRetry(url, { method: "HEAD" }, info.kind === "internal" ? 3 : 1);
    if ([403, 405].includes(response.status)) {
      response = await fetchWithRetry(url, { method: "GET", headers: { range: "bytes=0-1023" } }, 1);
    }
    results.set(url, {
      ok: response.ok,
      status: response.status,
      kind: info.kind,
      contentType: response.headers.get("content-type") || "",
      sourceUrl: info.sourceUrl,
    });
  } catch (error) {
    results.set(url, { ok: false, status: "ERROR", kind: info.kind, sourceUrl: info.sourceUrl, error: error.message });
  }
}

while (pageQueue.length > 0) {
  await crawlPage(pageQueue.shift());
}

for (const [url, info] of discovered) {
  if (!results.has(url)) await probeTarget(url, info);
}

for (const anchor of anchors) {
  const target = new URL(anchor.url);
  const fragment = decodeURIComponent(target.hash.slice(1));
  target.hash = "";
  const html = pageHtml.get(target.href);
  if (!html) continue;
  const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const found = new RegExp(`(?:id|name)=["']${escaped}["']`, "i").test(html);
  results.set(anchor.url, {
    ok: found,
    status: found ? "ANCHOR" : "MISSING_ANCHOR",
    kind: "anchor",
    sourceUrl: anchor.sourceUrl,
  });
}

const ordered = [...results.entries()].sort(([left], [right]) => left.localeCompare(right));
for (const [url, result] of ordered) {
  const label = result.ok ? (result.status === "MANUAL" ? "MANUAL" : "OK") : "FAIL";
  console.log(`${label.padEnd(6)} ${String(result.status).padEnd(14)} ${url}`);
}

const internalFailures = ordered.filter(([, result]) => !result.ok && result.kind !== "external");
const externalFailures = ordered.filter(([, result]) => !result.ok && result.kind === "external");
const manualLinks = ordered.filter(([, result]) => result.status === "MANUAL");

console.log(`\nChecked ${ordered.length} unique links/resources: ${internalFailures.length} internal failure(s), ${externalFailures.length} external failure(s), ${manualLinks.length} manual link(s).`);
if (manualLinks.length > 0) console.log("Manual links such as mailto: were syntax-checked but require a local client for end-to-end opening.");

if (internalFailures.length > 0 || (strictExternal && externalFailures.length > 0)) {
  process.exitCode = 1;
}
