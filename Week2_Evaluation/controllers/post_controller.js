import { Post } from "../models/post_model"

export const createPost = async(req, res) => {
    try {
        const post = await Post.create({
            ...req.body,
            author: req.body.id
        });
        res.status(200).json({
            success: true,
            message: "Post created",
            post
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getAllPost = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page-1)*limit;

        const total  = await Post.countDocuments();

        const posts = await Post.find().populate("author", "name, email").skip(skip).limit(limit);
        res.status(200).json({
            total,
            page, 
            pages: Math.ceil(total/limit),
            posts
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostById = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "name email");

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not Found"
            });
        }

        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        console.log(error.message);
    }
}

