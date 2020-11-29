const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ response: "Server is ready for the chat." }).status(200);
});

module.exports = router;