const express = require('express');
const router = express.Router();
const leadController = require('../controllers/lead');


router.post('/leads', leadController.createLead);
router.get('/leads', leadController.getLeads);
router.get('/leads/:id', leadController.getLeadById);
router.put('/leads/:id', leadController.updateLead);
router.delete('/leads/:id', leadController.deleteLead);


router.post('/leads/:id/score', leadController.scoreLead);

module.exports = router;