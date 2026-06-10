import mongoose from 'mongoose';

const availabilitySchema = mongoose.Schema({
    interviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interviewer',
        required: true,
    },
    daysOfWeek: {
        type: [String],
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Availability = mongoose.model('Availability', availabilitySchema);

export default Availability;