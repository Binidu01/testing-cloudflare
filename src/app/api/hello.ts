import { Hono } from 'hono'

const app = new Hono()

// Use absolute path that works on all platforms
app.get('/api/hello', (c) => {
  return c.json({
    message: 'welcome to bini.js',
    typescript: true,
    timestamp: new Date().toISOString(),
    platform: c.req.url
  })
})

export default app
