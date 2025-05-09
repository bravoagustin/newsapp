import express from "express";
import newsRoutes from "./routes/newsRoutes";
import sequelize from "./database/database";
import cors from "cors";

const app = express();

app.use(express.json());

app.use("/api", newsRoutes);

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://tu-app.netlify.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  credentials: true 
}));

app.listen(PORT, () => {
  console.log(
    `Server running:  ${PORT}`
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
