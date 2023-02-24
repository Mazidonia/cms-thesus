module.exports = {
  apps: [
    {
      name: "FRONT-ADMISSION",
      script: "npm start",
      cwd: "./",
      autorestart: true,
      env: {
        PORT: 3001,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: "production",
      },
    },
  ],
};
