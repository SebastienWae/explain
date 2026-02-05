#!/usr/bin/env bun

import path from "node:path";

const args = new Set(process.argv.slice(2));
const portFlagIndex = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
const portFromFlag =
  portFlagIndex >= 0 && process.argv[portFlagIndex + 1] ? Number(process.argv[portFlagIndex + 1]) : undefined;

const port = Number(process.env.PORT ?? portFromFlag ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

if (!Number.isFinite(port) || port <= 0) {
  console.error("Invalid port. Use --port <number> or set PORT.");
  process.exit(1);
}

const hostFlagIndex = process.argv.indexOf("--host");
const hostFromFlag =
  hostFlagIndex >= 0 && process.argv[hostFlagIndex + 1] ? process.argv[hostFlagIndex + 1] : undefined;

if (args.has("--help") || args.has("-h")) {
  console.log("Usage: explain-cli [--port <number>] [--host <host>]");
  process.exit(0);
}

const resolveDistDir = async () => {
  const envDist = process.env.EXPLAIN_DIST;
  if (envDist) return envDist;

  const cwdDist = path.resolve(process.cwd(), "dist");
  const cwdIndex = path.join(cwdDist, "index.html");
  if (await Bun.file(cwdIndex).exists()) {
    return cwdDist;
  }

  return path.dirname(process.execPath);
};

export const serveStaticAsset = async (distDir: string, pathname: string) => {
  const relativePath = pathname.replace(/^\/+/, "");
  const filePath = path.join(distDir, relativePath);
  const file = Bun.file(filePath);
  if (!(await file.exists())) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(file);
};

export const start = async () => {
  const distDir = await resolveDistDir();
  const indexPath = path.join(distDir, "index.html");

  const server = Bun.serve({
    port,
    hostname: hostFromFlag ?? host,
    routes: {
      "/": Bun.file(indexPath),
      "/assets/*": (req) => {
        const pathname = new URL(req.url).pathname;
        return serveStaticAsset(distDir, pathname);
      },
    },
    fetch(req) {
      if (req.method === "GET") {
        const acceptsHtml = req.headers.get("accept")?.includes("text/html");
        if (acceptsHtml) {
          return new Response(Bun.file(indexPath));
        }
      }
      return new Response("Not Found", { status: 404 });
    },
  });

  const url = `http://${server.hostname}:${server.port}`;
  console.log(`Server running at ${url}`);

  const openInBrowser = () => {
    const platform = process.platform;

    if (platform === "darwin") {
      return Bun.spawn(["open", url]);
    }

    if (platform === "win32") {
      return Bun.spawn(["cmd", "/c", "start", "", url]);
    }

    return Bun.spawn(["xdg-open", url]);
  };

  try {
    openInBrowser();
  } catch {
    console.warn("Unable to open the browser automatically.");
  }
};

if (import.meta.main) {
  start().catch((error) => {
    console.error("Failed to start server.", error);
    process.exit(1);
  });
}
