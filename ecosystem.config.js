// /var/www/html/saferx/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "saferx",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/var/www/html/saferx",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
