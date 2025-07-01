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
const getAllUsersRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = "SELECT * FROM users";
        const users = yield (0, sql_1.query)(sql, []);
        res.status(200).send(users);
    }
    catch (error) {
        res.send(500).send(`"[GET_USERS_ERROR]", ${error}`);
        console.error("[GET_USERS_ERROR]", error);
    }
});
exports.default = getAllUsersRouter;
