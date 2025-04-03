import express from "express";
import newsRoutes from "./routes/newsRoutes";
import sequelize from "./database/database";
import cors from "cors";

const app = express();

app.use(express.json());

app.use("/api", newsRoutes);

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://newsapp-ebon-sigma.vercel.app/', // Reemplaza con tu dominio Vercel
  'http://localhost:3000' // Desarrollo local
];

app.use(cors({
  origin: allowedOrigins,
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
