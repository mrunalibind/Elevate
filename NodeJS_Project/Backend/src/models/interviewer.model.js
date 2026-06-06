import mongoose from "mongoose";

const interviewerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    profileId: {
        type: String,
        unique: true
    },
},{
    timestamps: true
});

const Interviewer = mongoose.model("Interviewer", interviewerSchema);

export default Interviewer;