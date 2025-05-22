
const express = require('express');

const app = express();

BASE_URL = '/api/v1/talks';

const votes = Map();

app.post('/api/v1/talks', (req, res) => {
    const { talkId } = req.body;
    
});

app.post(BASE_URL, (req, res) => {
    const { talkId } = req.body;

});

app.post('/api/v1/talks/:voteId/votes', (req, res) => {
    const { voteId } = req.params;
    
    if (votes.has(voteId)) {
        votes.set(voteId, votes.get(voteId) + 1);
    }

});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
