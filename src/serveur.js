import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bootstrap from "./app.js";
const app = express();

//on lit le fichier et on accède aux variables d'environnement
dotenv.config();
// c'est une promesse
mongoose
  .connect(
  // on appelle la variable database dans .env
    process.env.DATABASE_URL
  )
  // puis on lance la fonction bootstrap dans app.js
  .then(() => {
    bootstrap(app);
  })
  .catch((err) => {
    console.error(`Source de l'erreur : ${err.message}`);
  });
