const Like = require("../models/likeModel");
const Post = require("../models/postModel");

//like a post
exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const like = new Like({
      post,
      user,
    });

    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes") //populate the likes array with Like documents
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error while liking the post",
    });
  }
};

//Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    //find and delete from Like collection
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like }); //jis bhi pehli entry ke andar ye dono parameters match kr jayenge vo delete ho jaayegi

    //find and delete from Post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } }, //likes ke andar jiski id deletedLike._id hai usko delete krna chahta hu
      { new: true }
    );

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error while unliking the post",
    });
  }
};
