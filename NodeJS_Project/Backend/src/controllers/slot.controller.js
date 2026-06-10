import Slot from "../models/slot.model.js";

export const getSlots = async (req, res) => {
    try {
        const slots = await Slot.find({
            interviewerId: req.user.interviewerId,
        }).sort({ startDateTime: 1 });

        res.status(200).json({
            success: true,
            count: slots.length,
            data: slots,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};