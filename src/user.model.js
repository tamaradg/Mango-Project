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
  },
  {
    timestamps: true,
  }
);
// on n'utilise pas de arrow fction pour avoir accès à this
UserSchema.methods.generateAuthToken = function () {
  // on a accès à la methode sign de jwt car on l'a importé
  const token = jwt.sign(
    {
      // équivaut à usershema._id
      _id: this._id,
      name: this.name,
    },
    //process salt ?
    process.env.SECRET_KEY
  );
  return token;
};
const User = mongoose.model("users", UserSchema);
export default User;
