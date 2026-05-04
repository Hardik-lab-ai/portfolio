import { spawn } from "child_process";
import { setTimeout as sleep } from "timers/promises";
import { createServer } from "net";

// Wait until port 3000 is actually accepting connections
async function waitForPort(port, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const socket = createServer();
        socket.once("error", reject);
        const c = require("net").createConnection(port, "localhost");
        c.once("connect", () => { c.destroy(); resolve(); });
        c.once("error", reject);
      });
      return true;
    } catch {
      await sleep(400);
    }
  }
  return false;
}

const server = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", "dev", "--port", "3000"],
  { stdio: "inherit", shell: false }
);

server.on("error", err => { console.error("Failed to start server:", err); process.exit(1); });

(async () => {
  console.log("\n🏗️  Starting Hardik Nakrani Portfolio...\n");
  await sleep(3500);
  spawn("open", ["http://localhost:3000"]);
  console.log("🚀  Opened http://localhost:3000 in your browser\n");
})();

process.on("SIGINT",  () => { server.kill(); process.exit(); });
process.on("SIGTERM", () => { server.kill(); process.exit(); });
