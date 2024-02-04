"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// @ts-ignore
const helmet_1 = __importDefault(require("helmet"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const verifyUser_1 = __importDefault(require("./middlewares/verifyUser"));
const sellsRoutes_1 = __importDefault(require("./routes/sellsRoutes"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
// ENV configuration
dotenv_1.default.config();
const whitelist = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];
// CORS handling
app.use((0, cors_1.default)({ credentials: true, origin: whitelist }));
// Connect to DB
(0, dbConfig_1.default)();
// Routes
app.use("/api/v1", userRoutes_1.default);
app.use("/api/v1", verifyUser_1.default, inventoryRoutes_1.default);
app.use("/api/v1", verifyUser_1.default, sellsRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Don't try to hack me!");
});
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        error: err,
    });
};
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports = app;
