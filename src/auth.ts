import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db, getDatabase } from "./database"
import { user, session, account, verification } from "./auth-schema"
import type { Env } from "./env"

/**
 * 创建 Better-Auth 实例
 * @param env - Cloudflare Workers/Pages 环境对象 (生产环境)
 */
export function createAuth(env?: Env) {
  const isProduction = env?.NODE_ENV === 'production' || !!env?.knowledge_focus_db;
  
  return betterAuth({
    baseURL: isProduction
      ? (env?.BETTER_AUTH_URL || "https://kf.huozhong.in")
      : "http://127.0.0.1:60325",
    
    database: drizzleAdapter(getDatabase(env), {
      provider: "sqlite",
      schema: {
        user,
        session,
        account,
        verification,
      },
    }),

    session: {
      updateAge: 24 * 60 * 60, // 24 hours
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    },

    advanced: {
      disableCSRFCheck: true,
      defaultCookieAttributes: {
        sameSite: "lax",
        secure: isProduction,
        httpOnly: true
      }
    },

    // 使用标准 socialProviders
    socialProviders: {
      google: {
        clientId: env?.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID!,
        clientSecret: env?.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET!,
        redirectURI: isProduction
          ? "https://kf.huozhong.in/api/auth/callback/google"
          : "http://127.0.0.1:60325/api/auth/callback/google",
      },
      github: {
        clientId: (env?.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID) as string,
        clientSecret: (env?.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET) as string,
        redirectURI: isProduction
          ? "https://kf.huozhong.in/api/auth/callback/github"
          : "http://127.0.0.1:60325/api/auth/callback/github",
      },
    },

    trustedOrigins: [
      "http://127.0.0.1:60325",
      "http://127.0.0.1:60315",
      "http://localhost:60325",
      "http://localhost:60315",
      "http://localhost:1420",
      "https://kf.huozhong.in"
    ],
  });
}

// 开发环境默认实例
export const auth = createAuth();

