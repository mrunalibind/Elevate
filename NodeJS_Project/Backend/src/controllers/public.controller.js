import Interviewer from "../models/interviewer.model.js";
import Slot from "../models/slot.model.js";

export const getAvailableSlots = async (req, res) => {
    try {
        const { profileId } = req.params;

        const { startDate, endDate } = req.query;

        const interviewer = await Interviewer.findOne({ profileId });

        if (!interviewer) {
            return res.status(404).json({
                success: false,
                message: "Interviewer not found",
            });
        }

        const filter = {
            interviewerId: interviewer._id,
            status: "available",
            startDateTime: { 
                $gte: new Date() 
            },
        }

        if(startDate || endDate) {
            filter.startDateTime = {};

            if(startDate) {
                filter.startDateTime.$gte = new Date(startDate);
            }

            if(endDate) {
                filter.startDateTime.$lte = new Date(endDate);
            }
        }

        const slots = await Slot.find(filter).sort({ startDateTime: 1 }).select("_id startDateTime endDateTime");

        res.status(200).json({
            success: true,
            interviewer: {
                name: interviewer.name,
                profileId: interviewer.profileId,
            },
            count: slots.length,
            data: slots,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};