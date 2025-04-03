"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const news_1 = __importDefault(require("../models/news"));
const router = express_1.default.Router();
router.get("/news", async (_req, res) => {
    try {
        const newsData = await news_1.default.findAll();
        return res.json(newsData);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching news", error });
    }
});
router.get("/news/:id", async (req, res) => {
    try {
        const news = await news_1.default.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        return res.json(news);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching news", error });
    }
});
router.post("/news", async (req, res) => {
    try {
        const { title, content, author, image_url } = req.body;
        const news = await news_1.default.create({ title, content, author, image_url });
        return res.status(201).json(news);
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating news", error });
    }
});
router.put("/news/:id", async (req, res) => {
    try {
        const { title, content } = req.body;
        const news = await news_1.default.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        await news.update({ title, content });
        return res.json(news);
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating news", error });
    }
});
router.delete("/news/:id", async (req, res) => {
    try {
        const news = await news_1.default.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        await news.destroy();
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting news", error });
    }
});
exports.default = router;
