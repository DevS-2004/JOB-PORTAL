import { Job } from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import {v2 as cloudinary} from "cloudinary";



// Get User Data
export const getUserData = async (req, res) => {

    const {userId }= req.auth()

    try {

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        res.json({success: true,user});

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message:error.message })
    }
}


// Apply for a job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body;

    const {userId} = req.auth()

    try {
        // Check if the user has already applied for the job
        const isAlreadyApplied = await JobApplication.find({ jobId,userId});

        if (isAlreadyApplied.length > 0 ) {
            return res.json({ success: false, message: "You have already applied for this job." });
        }

        const jobData = await Job.findById(jobId)
        
        if (!jobData) {
            return res.json({ success: false, message: "Job not found." });
        }

        await JobApplication.create({
            userId,
            jobId,
            companyId: jobData.companyId,
            date:Date.now()
        });

        res.json({ success: true, message: "Job application submitted successfully." });
    
    } catch (error) {
        return res.json({ success: false, message:error.message })
    }
}


//  Get user applied applications
export const getUserJobApplications = async (req, res) => {   

    try {

        const {userId} = req.auth();


        // Fetch the jobs the user has applied for
        const applications = await JobApplication.find({userId})
            .populate('companyId', 'name email image' )
            .populate('jobId', 'title description location salary level category' )
            .exec()

        if (!applications) {
            return res.json({ success: false, message: "No applications found." });
        }

        res.json({ success: true, applications});


    } catch (error) {
        console.error(error);
        return res.json({ success: false, message:error.message })
    }
}


// Upload user resume
export const updateUserResume = async (req, res) => {
    
    try {

        const {userId} = req.auth();

        const resumeFile = req.file

        const userData = await User.findById(userId);

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url;
        }

        await userData.save();

        res.json({success: true, message: "Resume uploaded successfully"})
        
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message:error.message })
    }
}


