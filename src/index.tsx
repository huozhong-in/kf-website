import { Hono } from 'hono'
import { renderer } from './renderer'
import { LandingPage } from './components/LandingPage'
import { ClientScript } from './components/ClientScript'

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      <LandingPage />
      <ClientScript />
    </>
  )
})

app.get('/privacy-policy', (c) => {
  return c.redirect('/static/privacy-policy-terms-of-service.html')
})

app.get('/terms-of-service', (c) => {
  return c.redirect('/static/privacy-policy-terms-of-service.html')
})

export default app
