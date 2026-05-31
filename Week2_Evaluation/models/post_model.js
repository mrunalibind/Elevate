import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: true
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    tags: [{
        type: String
    }],
    likes: {
        type: Number,
        default: 0
    }
},
{
    timestamp: true
});

export const Post = mongoose.model("Post", postSchema);