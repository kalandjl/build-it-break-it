"use strict";
// lib/db.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
const promise_1 = __importDefault(require("mysql2/promise"));
/**
 * Executes a SQL query against the database.
 * @param {string} sql - The SQL query string with '?' placeholders.
 * @param {Array} params - An array of parameters to be safely inserted into the query.
 * @returns {Promise<any>} - A promise that resolves with the query results.
 */
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the connection details from your environment variables
        if (!process.env.DB_PORT || process.env.DB_USER || process.env.DB_PASSWORD || process.env.DB_NAME)
            throw new Error("Environment variables undefined");
        const connection = yield promise_1.default.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        try {
            // Execute the query with parameters to prevent SQL injection
            const [results] = yield connection.execute(sql, params);
            return results;
        }
        catch (error) {
            // Log any errors
            // @ts-ignore
            console.error(`[DB QUERY ERROR]`, error.message);
            // Re-throw the error to be handled by the calling function
            throw new Error('An error occurred while querying the database.');
        }
        finally {
            // ALWAYS close the connection to free up resources
            if (connection) {
                yield connection.end();
            }
        }
    });
}
