"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsRoutes_1 = __importDefault(require("./routes/newsRoutes"));
const database_1 = __importDefault(require("./database/database"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", newsRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running:  http://localhost:${PORT}/api/news`);
});
database_1.default
    .sync({ force: false })
    .then(() => {
    console.log("DB Sincronized");
})
    .catch((error) => {
    console.error("Error DB:", error);
});
