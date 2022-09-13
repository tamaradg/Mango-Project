import User from "./user.model.js";
import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
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
  // ici on créé le user
  const newUser = new User(req.body);
  // ici on hash et on salt(2eme argument) le password
  newUser.password = await bcrypt.hash(req.body.password, 10);
  // on sauvegarde en db
  await newUser.save();
  return res.status(201).send(_.pick(newUser, ["name", "email"]));
});

// ici le user s'authentifie -> c'est le signin
usersRouter.post("/auth", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send(`Email and/or password incorrect.`);
  }
  // ici on compare le password de la request avec celui du user
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(404).send(`Email and/or password incorrect.`);
  }
  const token = user.generateAuthToken();
  return res.send({
    access_token: token,
  });
});


export default usersRouter;
