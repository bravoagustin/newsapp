"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNews = exports.deleteNews = exports.updateNews = exports.createNews = exports.getNewsById = exports.getAllNews = void 0;
const news_1 = __importDefault(require("../models/news"));
const sequelize_1 = require("sequelize");
const getAllNews = async (res) => {
    try {
        const news = await news_1.default.findAll();
        return res.json(news);
    }
    catch (error) {
        return res.status(500).json({ error: "Error retrieving news" });
    }
};
exports.getAllNews = getAllNews;
const getNewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await news_1.default.findByPk(id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        return res.json(news);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getNewsById = getNewsById;
const createNews = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newNews = await news_1.default.create({ title, content, author });
        res.status(201).json(newNews);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating news" });
    }
};
exports.createNews = createNews;
const updateNews = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const news = await news_1.default.findByPk(id);
        if (!news)
            return res.status(404).json({ error: "News not found" });
        await news.update({ title, content, author });
        return res.json(news);
    }
    catch (error) {
        return res.status(500).json({ error: "Error updating news" });
    }
};
exports.updateNews = updateNews;
const deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await news_1.default.findByPk(id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        await news.destroy();
        return res.status(200).json({ message: "News successfully deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteNews = deleteNews;
const searchNews = async (req, res) => {
    try {
        const { query } = req.query;
        const news = await news_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { title: { [sequelize_1.Op.iLike]: `%${query}%` } },
                    { author: { [sequelize_1.Op.iLike]: `%${query}%` } },
                ],
            },
        });
        res.json(news);
    }
    catch (error) {
        res.status(500).json({ error: "Error searching news" });
    }
};
exports.searchNews = searchNews;
