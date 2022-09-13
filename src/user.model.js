import mongoose from "mongoose";
//jwt va nous permettre de sécuriser les données à l'authentification du user
import jwt from "jsonwebtoken";
// on créé notre table user sur mangodb
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // correspond à l'id de l'utilisateur
    owner: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "users",

    },
  },
  {
    timestamps: true,
  }
);
// on n'utilise pas de arrow fction pour avoir accès à this
UserSchema.methods.generateAuthToken = function () {
  // on a accès à la methode sign de jwt car on l'a importé,
  // ici notre token en 2 parties:
  const token = jwt.sign(
    {
      // équivaut à usershema._id
      _id: this._id,
      name: this.name,
    },
    // on fait appel à la secret key dans .env qui va composer la 2 eme partie du token pour le user
    process.env.SECRET_KEY
  );
  return token;
};
const User = mongoose.model("users", UserSchema);
export default User;
