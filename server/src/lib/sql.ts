// lib/db.js

import mysql from 'mysql2/promise';

/**
 * Executes a SQL query against the database.
 * @param {string} sql - The SQL query string with '?' placeholders.
 * @param {Array} params - An array of parameters to be safely inserted into the query.
 * @returns {Promise<any>} - A promise that resolves with the query results.
 */
export async function query(sql: string, params: any[]) {


  // Get the connection details from your environment variables
  if (!process.env.DB_PORT || process.env.DB_USER || process.env.DB_PASSWORD || process.env.DB_NAME) throw new Error("Environment variables undefined")

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // Execute the query with parameters to prevent SQL injection
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    // Log any errors
    // @ts-ignore
    console.error(`[DB QUERY ERROR]`, error.message);
    // Re-throw the error to be handled by the calling function
    throw new Error('An error occurred while querying the database.');
  } finally {
    // ALWAYS close the connection to free up resources
    if (connection) {
      await connection.end();
    }
  }
}