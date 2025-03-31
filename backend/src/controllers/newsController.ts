import { Request, Response } from "express";
import News from "../models/News";
import { Op } from "sequelize";

export const getAllNews = async (res: Response): Promise<Response> => {
  try {
    const news = await News.findAll();
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving news" });
  }
};

export const getNewsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createNews = async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;
    const newNews = await News.create({ title, content, author });
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: "Error creating news" });
  }
};

export const updateNews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  try {
    const news = await News.findByPk(id);
    if (!news) return res.status(404).json({ error: "News not found" });

    await news.update({ title, content, author });
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ error: "Error updating news" });
  }
};

export const deleteNews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.destroy();
    return res.status(200).json({ message: "News successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const searchNews = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const news = await News.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Error searching news" });
  }
};
