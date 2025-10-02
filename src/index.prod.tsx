import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Env } from './env'

// 生产环境: 使用 Cloudflare D1
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { drizzle } from 'drizzle-orm/d1'
import { user, session, account, verification } from "./auth-schema"

function createProdAuth(env: Env) {
  const db = drizzle(env.knowledge_focus_db);
  
  return betterAuth({
    baseURL: env.BETTER_AUTH_URL || "https://kf.huozhong.in",
    
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: { user, session, account, verification },
    }),

    session: {
      updateAge: 24 * 60 * 60,
      expiresIn: 60 * 60 * 24 * 7,
    },

    advanced: {
      disableCSRFCheck: true,
      defaultCookieAttributes: {
        sameSite: "lax",
        secure: true,
        httpOnly: true
      }
    },

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
        redirectURI: "https://kf.huozhong.in/api/auth/callback/google",
      },
      github: {
        clientId: env.GITHUB_CLIENT_ID!,
        clientSecret: env.GITHUB_CLIENT_SECRET!,
        redirectURI: "https://kf.huozhong.in/api/auth/callback/github",
      },
    },

    trustedOrigins: [
      "https://kf.huozhong.in"
    ],
  });
}

// 生产环境 fetch handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const app = new Hono<{ Bindings: Env }>();
    const auth = createProdAuth(env);

    // CORS配置
    app.use('*', cors({
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000', 
        'http://localhost:1420',
        'http://127.0.0.1:1420',
        'http://localhost:60325',
        'http://127.0.0.1:60325',
        'tauri://localhost',
        'https://tauri.localhost',
        'https://kf.huozhong.in'
      ],
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Platform']
    }))

    // 身份验证路由
    app.on(['GET', 'POST'], '/api/auth/*', (c) => {
      console.log('[Production] Auth request:', c.req.method, c.req.url);
      return auth.handler(c.req.raw);
    })

    // 健康检查
    app.get('/health', (c) => {
      return c.json({ 
        status: 'ok', 
        env: 'production',
        database: 'D1'
      });
    })

    // 根路由
    app.get('/', (c) => {
      return c.json({ 
        message: 'Knowledge Focus Auth Server (Production)',
        env: 'production',
        database: 'Cloudflare D1'
      });
    })

    return app.fetch(request, env);
  },
} satisfies ExportedHandler<Env>;