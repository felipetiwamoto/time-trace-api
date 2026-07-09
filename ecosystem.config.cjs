module.exports = {
  apps: [
    {
      name: "time-trace-api",
      script: "./dist/main.js",
      cwd: "/app",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      exp_backoff_restart_delay: 100,
      kill_timeout: 5000,
      env: {
        NODE_ENV: "production",
        PORT: "8000"
      }
    }
  ]
};
