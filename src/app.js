import express from "express";
import cors from "cors";
import contactsRouter from "./contact.router.js";

const PORT = process.env.PORT || 3000;

export default function bootstrap(app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/contacts", contactsRouter);
  app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port ${PORT} 🚀`);
  });
}
