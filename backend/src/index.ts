import express from "express";
import newsRoutes from "./routes/newsRoutes";
import sequelize from "./database/database";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", newsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running:  http://localhost:${PORT}/api/news`
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
