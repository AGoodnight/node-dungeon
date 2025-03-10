"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var chalk_1 = require("chalk");
var app = (0, express_1.default)();
app.listen(8080, function () {
    console.log(chalk_1.default.green("Running Server on localhost:8080"));
});
exports.default = app;
