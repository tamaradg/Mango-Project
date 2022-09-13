import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    // ici on ajoute les infos du user qui crée le contact à la db
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("contacts", ContactSchema);
export default Contact;
