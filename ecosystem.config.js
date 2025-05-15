// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "saferx",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3015",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
