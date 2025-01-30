const express = require('express');
const router = express.Router();
const JobsController = require('../controller/JobsContoller');
const {verifyToken} = require('../middleware/authMiddleware');


router.get('/jobs',JobsController.getJobs);
router.get('/cities',JobsController.getCities);
router.get("/jobs/:id", JobsController.getJobDetail);
router.get('/filters',JobsController.getFilters);
router.post("/apply", verifyToken, JobsController.applyToJob);
router.get("/applications", verifyToken, JobsController.checkApplications);

  
module.exports = router;