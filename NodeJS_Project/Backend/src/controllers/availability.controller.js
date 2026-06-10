import Availability from "../models/availability.model.js";
import { generateSlots } from "../services/slot.service.js";
import { convertToMinutes } from "../utils/time.js";

export const createAvailability = async (req, res) => {
    try {
        const { daysOfWeek, startTime, endTime, duration } = req.body;

        const existingAvailability = await Availability.find({ interviewerId: req.user.interviewerId });

        for (const existing of existingAvailability) {

            const commonDays = daysOfWeek.filter(day => existing.daysOfWeek.includes(day));

            if (commonDays.length === 0) {
                continue;
            }

            const newStart = convertToMinutes(startTime);

            const newEnd = convertToMinutes(endTime);

            const existingStart = convertToMinutes(existing.startTime);

            const existingEnd = convertToMinutes(existing.endTime);

            const overlap = newStart < existingEnd && newEnd >existingStart;

            if (overlap) {
                return res.status(400).json({
                    success: false,
                    message: "Availability overlaps with existing availability",
                });
            }
        }

        const availability = await Availability.create({
            interviewerId: req.user.interviewerId,
            daysOfWeek,
            startTime,
            endTime,
            duration,
        });

        await generateSlots(availability);

        res.status(201).json({
            success: true,
            data: availability,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAvailability = async (req, res) => {
    try {
        const availability = await Availability.find({
            interviewerId: req.user.interviewerId,
        });

        res.status(200).json({
            success: true,
            data: availability,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};