const express = require('express');
const router = express.Router();
const Progress = require('../models/progress.js');
router.post('/markdone', async (req, res) => {
    const { email } = req.body;
    const today = new Date().toISOString().split('T')[0];

    try {
        const existing = await Progress.findOne({ email, date: today });
        if (existing) {
            return res.json({ success: false, message: "Already marked today" });
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const yesterdayProgress = await Progress.findOne({ email, date: yesterdayStr });

        const totalProgress = await Progress.countDocuments({ email });

        if (yesterdayProgress || totalProgress === 0) {
            await Progress.create({ email, date: today, completed: true });
            const newCount = totalProgress + 1;
            return res.json({ success: true, count: newCount });
        } else {
            return res.json({ success: false, message: "Missed yesterday, no star today" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


router.get('/starcount/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const count = await Progress.countDocuments({ email });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
