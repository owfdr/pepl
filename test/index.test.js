const { spawn } = require("child_process");

describe("index.js", () => {
  it("should run without any errors", (done) => {
    const process = spawn("node", ["src/index.js", "test/test.py"]);

    process.stdout.on("data", (data) => {
      expect(data.toString()).not.toMatch(/err/i);
    });

    process.stderr.on("data", (data) => {
      expect(data.toString()).not.toMatch(/err/i);
    });

    process.on("error", (error) => {
      done(error);
    });

    process.on("exit", (code) => {
      done();
    });

    setTimeout(() => {
      process.kill("SIGTERM");
    }, 1000);
  });
});
