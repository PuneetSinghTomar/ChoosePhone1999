import Author from "../model/Author.js";

// @desc   GET all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch authors", error });
  }
};

// @desc   GET single author by name
export const getAuthorByName = async (req, res) => {
  try {
    const author = await Author.findOne({ name: req.params.name });
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch author", error: err.message });
  }
};


// @desc   Create a new author
export const createAuthor = async (req, res) => {
  try {
    const { name, bio, LinkedIn, instagram } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : null;

    const newAuthor = new Author({
      name,
      bio,
      LinkedIn,
      instagram,
      avatar,
    });

    const saved = await newAuthor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save author", error: err });
  }
};

