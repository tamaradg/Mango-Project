import express from "express";
import cors from "cors";
import contactsRouter from "./contact.router.js";
import usersRouter from "./users.router.js";


const PORT = process.env.PORT || 3000;

export default function bootstrap(app) {
  app.use(express.json());
  app.use(cors());
  // on ajoute l'url de base ici
  app.use("/api/contacts", contactsRouter);
  app.use("/api/users", usersRouter);
  app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port ${PORT} 🚀`);
  });
}
