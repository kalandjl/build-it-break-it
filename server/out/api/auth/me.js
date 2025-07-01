"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../../lib/sql");
const meRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get the userId from req.user attached by the middleware
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID not found in token payload" });
        }
        // Fetch user data from DB, but EXCLUDE the password
        const sql = "SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1";
        const users = yield (0, sql_1.query)(sql, [userId]);
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = users[0];
        res.status(200).json({ user: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An internal server error occurred" });
    }
});
exports.default = meRouter;
