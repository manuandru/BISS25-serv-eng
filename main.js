const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const talks = new Map();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Get all talks
app.get('/api/v1/talks', (req, res) => {
    console.log('talks', talks);
    const talksArray = Array.from(talks.entries()).map(([talkId, votes]) => ({ talkId, votes }));
    res.json(talksArray);
});

// Add a new talk
app.post('/api/v1/talks', (req, res) => {
    const { talkId } = req.body;
    if (!talkId) {
        return res.status(400).json({ error: 'Talk ID is required.' });
    }
    const existingTalk = talks.has(talkId);
    if (existingTalk) {
        return res.status(409).json({ error: 'Talk ID already exists.' });
    }
    talks.set(talkId, 0);
    res.status(201).json({ talkId, votes: 0 });
});

// Vote for a talk
app.post('/api/v1/talks/:talkId/vote', (req, res) => {
    const talkId = req.params.talkId;
    if (!talks.has(talkId)) {
        return res.status(404).json({ error: 'Talk not found.' });
    }
    const votes = talks.get(talkId) + 1;
    talks.set(talkId, votes);
    res.json({ talkId, votes });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});