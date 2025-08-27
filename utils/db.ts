import { Pool } from "@db/postgres";

const DB_URL = Deno.env.get("DATABASE_URL") ??
  "postgres://tuba:rato12@localhost:5432/kayozen";

const pool = new Pool(DB_URL, 3, true);

export async function query(sql: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    return await client.queryObject(sql, params);
  } finally {
    client.release();
  }
}
