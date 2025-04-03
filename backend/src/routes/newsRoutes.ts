import express, { Request, Response } from "express";
import News from "../models/news";

const router = express.Router();

router.get("/news", async (_req: Request, res: Response): Promise<any> => {
  try {
    const newsData = await News.findAll();
    return res.json(newsData);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching news", error });
  }
});

router.get("/news/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const news = await News.findByPk(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.json(news);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching news", error });
  }
});

router.post("/news", async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, content, author, image_url } = req.body;
    const news = await News.create({ title, content, author, image_url });
    return res.status(201).json(news);
  } catch (error) {
    return res.status(500).json({ message: "Error creating news", error });
  }
});

router.put("/news/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, content } = req.body;
    const news = await News.findByPk(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.update({ title, content });
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ message: "Error updating news", error });
  }
});

router.delete(
  "/news/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const news = await News.findByPk(req.params.id);

      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }

      await news.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting news", error });
    }
  }
);

export default router;
