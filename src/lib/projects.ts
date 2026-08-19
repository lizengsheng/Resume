import type { CollectionEntry } from "astro:content";

export function getProjectSlug(project: CollectionEntry<"projects">) {
  return project.data.slug || project.id.replace(/\.(md|mdx)$/i, "").split("/").pop() || project.id;
}
export function sortProjects(projects: CollectionEntry<"projects">[]) {
  return projects.sort((a, b) => {
    const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (b.data.period ?? "").localeCompare(a.data.period ?? "") || a.data.title.localeCompare(b.data.title, "zh-CN");
  });
}
