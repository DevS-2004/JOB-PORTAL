import express from 'express';
import { getUserData, applyForJob, getUserJobApplications, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';
import { requireAuth } from '@clerk/express';


const router = express.Router();

// Get User data
router.get('/user', getUserData);

// Apply for a job
router.post('/apply', applyForJob);

// Get applied jobs
router.get('/applications', getUserJobApplications);

// Update user profile(resume)
router.post('/upload-resume', requireAuth(),upload.single('resume'), updateUserResume); 

export default router;