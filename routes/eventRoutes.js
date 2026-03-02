const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// CREATE or UPDATE Event
router.post("/create", async (req, res) => {
    const { title, year, department, totalMinutes } = req.body;

    const totalSeconds = totalMinutes * 60;

    let event = await Event.findOne();

    if (event) {
        // UPDATE existing
        event.title = title;
        event.year = year;
        event.department = department;
        event.totalSeconds = totalSeconds;
        event.remainingSeconds = totalSeconds;
        event.status = "Live";
        event.isRunning = false;
        await event.save();
    } else {
        // CREATE new
        event = await Event.create({
            title,
            year,
            department,
            totalSeconds,
            remainingSeconds: totalSeconds,
            status: "Live",
            isRunning: false
        });
    }

    res.json({ message: "Event Saved", event });
});

// GET CURRENT EVENT
router.get("/current", async (req, res) => {

    const event = await Event.findOne();

    if(!event) return res.json(null);

    if(event.isRunning && event.startTime){

        const now = new Date();
        const elapsed = Math.floor((now - event.startTime) / 1000);

        const remaining = event.totalSeconds - elapsed;

        event.remainingSeconds = remaining > 0 ? remaining : 0;

        if(event.remainingSeconds <= 0){
            event.status = "Ended";
            event.isRunning = false;
        }

        await event.save();
    }

    res.json(event);
});



router.post("/start", async (req, res) => {

    const event = await Event.findOne();

    event.lastStartedAt = Date.now();
    event.isRunning = true;
    event.status = "Live";

    await event.save();
    res.json({ message: "Started" });
});

router.post("/pause", async (req, res) => {

    const event = await Event.findOne();

    if (event.isRunning) {
        const diff = Math.floor((Date.now() - event.lastStartedAt) / 1000);
        event.remainingSeconds -= diff;
    }

    event.isRunning = false;
    event.status = "Break";

    await event.save();
    res.json({ message: "Paused" });
});

router.post("/end", async (req, res) => {

    const event = await Event.findOne();

    event.isRunning = false;
    event.status = "Ended";
    event.remainingSeconds = 0;

    await event.save();
    res.json({ message: "Ended" });
});

module.exports = router;