"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
const chalk_1 = __importDefault(require("chalk"));
function logger(req, res, next) {
    console.log(chalk_1.default.blue(req.body));
    next();
}
