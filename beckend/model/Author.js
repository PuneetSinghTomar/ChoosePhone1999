import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: { type: String },
  bio: { type: String },
  avatar: { type: String },
  instagram: { type: String },
  LinkedIn: { type: String },
});

export default mongoose.models.Author || mongoose.model("Author", AuthorSchema);
