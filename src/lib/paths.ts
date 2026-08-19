const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path = "/") {
  if (path === "/") return `${base}/`;
  return `${base}/${path.replace(/^\//, "")}`;
}
