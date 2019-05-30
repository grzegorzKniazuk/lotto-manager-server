"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var origin_1 = require("./constants/origin");
var expressApp = express();
(function () {
    expressApp.use(express.json({ limit: '10mb' }));
    expressApp.use(express.urlencoded({ extended: false }));
    expressApp.use(cors({ credentials: true, origin: origin_1.ORIGIN, optionsSuccessStatus: 200 }));
    expressApp.listen(3000);
})();
//# sourceMappingURL=app.js.map