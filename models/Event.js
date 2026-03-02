const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: String,
    year: Number,
    department: String,
    totalSeconds: Number,
    remainingSeconds: Number,
    status: {
        type: String,
        enum: ["Live", "Break", "Submission", "Ended"],
        default: "Live"
    },
    isRunning: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Event", eventSchema);