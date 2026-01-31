#!/usr/bin/env bun

import app from "../index.html";

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

const server = Bun.serve({
  port,
  hostname: hostFromFlag ?? host,
  routes: {
    "/": app,
  },
  development: process.env.NODE_ENV !== "production",
  fetch() {
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
