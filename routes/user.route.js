const express = require('express');
const router = express.Router();

router.post('/role/:role', (req, res) => {
    if (req.userData.role === req.params.role) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
});

module.exports = router;
