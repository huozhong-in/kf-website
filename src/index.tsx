import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

app.get('/privacy-policy', (c) => {
  return c.redirect('/static/privacy-policy-terms-of-service.html')
})

app.get('/terms-of-service', (c) => {
  return c.redirect('/static/privacy-policy-terms-of-service.html')
})

export default app
