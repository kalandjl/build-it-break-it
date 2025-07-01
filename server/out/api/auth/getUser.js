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
const getUserRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            return res.status(400).json({ message: "User ID parameter is required" });
        }
        const sql = "SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1";
        const users = yield (0, sql_1.query)(sql, [id]);
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = users[0];
        res.status(200).json({ user: user });
    }
    catch (error) {
        console.error("[GET_USER_ERROR]", error);
        res.status(500).json({ message: "An internal server error occurred" });
    }
});
exports.default = getUserRouter;
