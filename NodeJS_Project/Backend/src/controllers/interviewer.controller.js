import Interviewer from "../models/interviewer.model.js";

export const getProfile = async (req, res) => {
    try {
        const interviewer = await Interviewer.findById(
            req.user.interviewerId
        ).select("-accessToken -refreshToken");

        res.status(200).json({
            success: true,
            data: interviewer,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

