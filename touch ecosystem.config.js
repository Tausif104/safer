module.exports = {
  apps: [
    {
      name: "saferx",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3015",
      cwd: "/var/www/html/saferx",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
