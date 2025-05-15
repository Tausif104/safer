// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "safe-rx",
      script: "npm",
      args: "start",
      cwd: "/var/www/html/saferx", // or wherever it's deployed
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
