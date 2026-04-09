import { Hono } from 'hono'

const app = new Hono()

// GET endpoint at /api/hello
app.get('/hello', (c) => {
  return c.json({
    message: 'welcome to bini.js',
    typescript: true,
    timestamp: new Date().toISOString(),
    method: c.req.method
  })
})

// Optional: Handle POST requests
app.post('/hello', (c) => {
  return c.json({
    message: 'welcome to bini.js',
    typescript: true,
    timestamp: new Date().toISOString(),
    method: c.req.method
  })
})

export default app