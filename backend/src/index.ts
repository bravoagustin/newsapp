import express from "express";
import newsRoutes from "./routes/newsRoutes";
import sequelize from "./database/database";

const app = express();

app.use(express.json());

app.use("/api", newsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port 5000:  http://localhost:${PORT}/api/news`
  );
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Sincronized");
  })
  .catch((error) => {
    console.error("Error DB:", error);
  });
