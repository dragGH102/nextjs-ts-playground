import mysql from 'serverless-mysql';

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT as any,
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  },
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
