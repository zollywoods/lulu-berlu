import { existsSync, rmSync, statfsSync } from "fs";
import { spawnSync } from "child_process";
import { join } from "path";

const devDir = join(".next", "dev");
const lockFile = join(devDir, "lock");

if (existsSync(lockFile)) {
  console.log("Removing stale Next.js dev cache...");
  rmSync(devDir, { recursive: true, force: true });
}

try {
  const stats = statfsSync(".");
  const freeBytes = stats.bfree * stats.bsize;
  if (freeBytes < 500 * 1024 * 1024) {
    console.warn(
      `Warning: low disk space (${Math.round(freeBytes / 1024 / 1024)}MB free). This can cause Turbopack panics. Run: npm run clean`,
    );
  }
} catch {
  // statfsSync unavailable on some platforms
}

const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 20 || (major === 20 && minor < 9)) {
  console.warn(
    `Warning: Node ${process.versions.node} is below Next.js minimum (20.9.0). Run: nvm use`,
  );
}

const args = ["next", "dev", "--webpack", ...process.argv.slice(2)];
const result = spawnSync("npx", args, { stdio: "inherit", shell: true });

process.exit(result.status ?? 1);
