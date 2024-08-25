import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import { Job } from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";

// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const imageFile = req.file;

        if (!name || !email || !password || !imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // Check if company already exists
        try {
            const companyExists = await Company.findOne({ email });
            if (companyExists) {
                return res.status(400).json({ success: false, message: "Company already exists" });
            } 

            const salt = await bcrypt.genSalt(10);
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, salt);

            const imageUpload =  await cloudinary.uploader.upload(imageFile.path)


            // Create a new company
            const company = await Company.create({
                name,
                email,
                password: hashedPassword,
                image: imageUpload.secure_url // Assuming the image is stored in a path
            });

            // Respond with success
            return res.status(201).json({
                success: true,
                message: "Company registered successfully",
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id),
            });  
        } catch (error) {
            console.log("Error checking company existence:", error);
            return res.status(500).json({ success: false, message: error.message });
        }

    } catch (error) {
        console.error("Error registering company:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Company Login
export const loginCompany = async (req, res) => {

    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ email });


        if(await bcrypt.compare(password, company.password)) {

                res.status(200).json({
                success: true,
                message: "Company logged in successfully",
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id),
            });
        } else {
            res.json({success:false,message:'Invalid email or Password !!'})
        }

    } catch (error) {
        console.error("Error logging in company:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// Get Company data
export const getCompanyData = async (req, res) => {

    const company = req.company;
    try {
        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            }
        });

    } catch (error) {
        console.error("Error fetching company data:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Post a  new job  
export const postJob = async (req, res) => {
    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id;

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        });

        await newJob.save();

        res.status(201).json({
            success: true,
            message: "Job posted successfully",
            newJob
        });
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
    try {
        const companyId  = req.company._id;

        // find job applications for the user and populate job and user details
        const applications = await JobApplication.find({ companyId })
            .populate('jobId', 'title location salary level category')
            .populate('userId', 'name email image resume')
            .exec();

        return res.status(200).json({
            success: true,
            message: "Job applicants fetched successfully",
            applications
        }); 

    } catch (error) {
        console.error("Error fetching job applicants:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => { 
    try {
        const companyId = req.company._id;

        const jobs = await Job.find({ companyId })

        // adding no. of applicants to each job
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return {...job.toObject(),applicants:applicants.length};
        }));

        res.status(200).json({success: true,jobsData});

    } catch (error) {
        console.error("Error fetching posted jobs:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// Change job application status
export const changeJobApplicationStatus = async (req, res) => {
    try {
        const {id,status} = req.body; // id is the job application id
        
        // Find the job application by id
        await JobApplication.findOneAndUpdate({_id:id},{status});
        
        res.status(200).json({
            success: true,
            message: "Job application status changed successfully",
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Change job visibility
export const changeVisibility = async (req, res) => {
    try {
        const { id } = req.body;

        const companyId = req.company._id;

        const job = await Job.findById(id);

        if(companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible; // Toggle visibility
        }

        await job.save();

        res.status(200).json({
            success: true,
            message: "Job visibility changed successfully",
            job
        });

    } catch (error) {
        console.error("Error changing job visibility:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}