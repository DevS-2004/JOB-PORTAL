import express from 'express';
import { loginCompany,changeVisibility,changeJobApplicationStatus,getCompanyPostedJobs,getCompanyJobApplicants ,registerCompany,getCompanyData ,postJob} from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';


const router = express.Router();


// Register a  company
router.post('/register',upload.single('image'), registerCompany);

// Login a company
router.post('/login',loginCompany);

// Get company data
router.get('/company',protectCompany, getCompanyData);

// Post a new job
router.post('/post-job',protectCompany, postJob);

// Get company job applicants
router.get('/applicants',protectCompany, getCompanyJobApplicants);

// Get company job list
router.get('/list-jobs',protectCompany, getCompanyPostedJobs);

// Change Application Status
router.post('/change-status',protectCompany, changeJobApplicationStatus);

// Change application visibility
router.post('/change-visibility',protectCompany, changeVisibility);

export default router;