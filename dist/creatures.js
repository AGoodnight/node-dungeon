"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const factories_1 = require("./factories");
exports.router = express_1.default.Router();
exports.router.get("/random", (req, res) => {
    req.query.limit;
    res.json(getCreatures());
});
exports.router.get("/:id", (req, res) => {
    req.params.id;
    res.json({
        id: req.params.id
    });
});
function getCreatures() {
    return (0, factories_1.createCreatures)(10);
}
exports.default = exports.router;
