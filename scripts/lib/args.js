// 공통 옵션 파서: --key value / --key=value / --flag. 값 자리에 다른 옵션(--x)이 오면 빈 값으로 본다.
function parseArgs(argv = process.argv.slice(2)) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }
    const eq = arg.indexOf("=");
    if (eq !== -1) {
      flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      continue;
    }
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      flags[arg.slice(2)] = true;
    } else {
      flags[arg.slice(2)] = next;
      i += 1;
    }
  }
  return { flags, positional };
}

// 문자열 값만 받는다. 값 없이 쓴 옵션(true)이나 빈 문자열은 fallback.
function str(flags, name, fallback = "") {
  const v = flags[name];
  return typeof v === "string" && v.trim() !== "" ? v : fallback;
}

function expandHome(p) {
  return p.replace(/^~(?=$|\/)/, require("os").homedir());
}

module.exports = { parseArgs, str, expandHome };
