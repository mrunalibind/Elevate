import Slot from "../models/slot.model.js";

export const generateSlots = async (availability) => {
    const { interviewerId, _id, daysOfWeek, startTime, endTime, duration } = availability;

    const today = new Date();
    const endDate = new Date();

    endDate.setDate(endDate.getDate() + 30);

    const slotsToInsert = [];

    for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 1)) {
        const currentDay = date.getDay();

        if (!daysOfWeek.includes(currentDay)) {
            continue;
        }

        const [ startHour, startMinute ] = startTime.split(":").map(Number);

        const [ endHour, endMinute ] = endTime.split(":").map(Number);

        let slotStart = new Date(date);

        slotStart.setHours( startHour, startMinute, 0, 0 );

        const dayEnd = new Date(date);

        dayEnd.setHours(endHour,endMinute,0,0);

        while (slotStart < dayEnd) {
            const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);

            if (slotEnd > dayEnd) {
                break;
            }

            slotsToInsert.push({
                interviewerId,
                availabilityId: _id,
                startDateTime: new Date(slotStart),
                endDateTime: new Date(slotEnd),
            });

            slotStart = slotEnd;
        }
    }

    if (slotsToInsert.length > 0) {
        await Slot.insertMany(slotsToInsert, { ordered: false});
    }
};

