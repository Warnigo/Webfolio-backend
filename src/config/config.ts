export const config = () => ({
  port: process.env.PORT || 3000,
  redis_host: process.env.REDIS_HOST || 'localhost',
  api_version: process.env.API_VERSION || 1,
})
