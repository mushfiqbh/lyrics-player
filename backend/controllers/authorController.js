import authorModel from "../models/authorModel.js";

const addAuthor = async (req, res) => {
  const newAuthor = new authorModel({
    name: req.body.name,
    bio: req.body.bio,
  });

  try {
    const author = await newAuthor.save();
    res.json({
      success: true,
      data: author,
      message: "Author Added",
    });
  } catch (error) {
    res.json({ success: false, message: "Error Adding Author" });
  }
};

const authorList = async (req, res) => {
  try {
    const list = await authorModel.find({});
    res.json({ success: true, data: list });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

export { addAuthor, authorList };

// const getAuthor = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await postModel.findById(id);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.json({ success: true, data: post });
//   } catch (error) {
//     ews.json({ success: false, message: "Error Occurred" });
//   }
// };

//   const updatePost = async (req, res) => {
//     const { id } = req.params;

//     try {
//       const post = await postModel.findById(id);
//       if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//       }

//       await postModel.findByIdAndUpdate(id, req.body);
//       const updatedPost = await postModel.findById(id);
//       res.status(200).json({ message: "Post Updated", data: updatedPost });
//     } catch (error) {
//       res.status(500).json({ message: "Error updating post", error });
//     }
//   };

//   const deletePost = async (req, res) => {
//     const { id } = req.params;

//     try {
//       const post = await postModel.findById(id);
//       if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//       }

//       await postModel.findByIdAndDelete(id);
//       res.status(200).json({ message: "Post Deleted" });
//     } catch (error) {
//       res.status(500).json({ message: "Error Deleting Post", error });
//     }
//   };
