"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const creatures_1 = __importDefault(require("./creatures"));
const logger_1 = require("./middleware/logger");
const app = (0, express_1.default)();
app.use(logger_1.logger);
app.use("/creatures", creatures_1.default);
app.route("/")
    .get((_req, res) => {
    res.send("hello");
});
app.listen(8080, () => {
    console.log(chalk_1.default.green("Running Server on localhost:8080"));
});
