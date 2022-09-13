import User from "./user.model.js";
import express from "express";
import bcrypt from "bcrypt";
const usersRouter = express.Router();

// Create user
usersRouter.post("/signup", async (req, res) => {
  //on cherche l'utilisateur qui créé son compte pour voir s'il est déjà en db
  const user = await User.findOne({ email: req.body.email });
  // s'il est déjà en db on retourne une erreur
  if (user) {
    return res
      .status(400)
      .send(`User with email ${req.body.email} already exists.`);
  }
});


export default usersRouter;
