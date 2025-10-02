import 'dotenv/config';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import Database from 'better-sqlite3';
import type { Env } from './env';

/**
 * 开发环境: 使用 better-sqlite3 (本地文件)
 * 生产环境: 使用 Cloudflare D1 (通过 env.knowledge_focus_db)
 */

// 开发环境数据库 (仅在非 Cloudflare 环境使用)
let devDb: ReturnType<typeof drizzleSqlite> | null = null;

function getDevDb() {
  if (!devDb) {
    const sqlite = new Database(process.env.DATABASE_URL || 'kfuser.db');
    devDb = drizzleSqlite(sqlite);
  }
  return devDb;
}

/**
 * 获取数据库实例
 * @param env - Cloudflare Workers/Pages 环境对象 (生产环境)
 * @returns Drizzle ORM 实例
 */
export function getDatabase(env?: Env) {
  // 生产环境: 使用 Cloudflare D1
  if (env?.knowledge_focus_db) {
    return drizzleD1(env.knowledge_focus_db);
  }
  
  // 开发环境: 使用 better-sqlite3
  return getDevDb();
}

// 默认导出 (开发环境兼容)
export const db = getDevDb();