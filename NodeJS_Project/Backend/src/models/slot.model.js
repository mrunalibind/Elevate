import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
    interviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interviewer",
        required: true,
    },
    availabilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Availability",
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "booked", "cancelled", "completed"],
        default: "available",
    }
}, {
    timestamps: true,
});

const Slot = mongoose.model("Slot", slotSchema);

slotSchema.index(
    { 
        interviewerId: 1, startDateTime: 1, endDateTime: 1,
    }, 
    { 
        unique: true,
    }
);

export default Slot;