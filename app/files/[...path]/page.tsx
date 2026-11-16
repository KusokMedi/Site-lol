import { collectDirectories, FilesBrowser } from "../browser";

export async function generateStaticParams() {
  const dirs = await collectDirectories();
  const params = dirs
    .filter((segments) => segments.length > 0)
    .map((segments) => ({ path: segments }));
  if (params.length === 0) return [{ path: ["_placeholder"] }];
  return params;
}

export default async function FilesPathPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path: segments = [] } = await params;
  return <FilesBrowser segments={segments} />;
}
