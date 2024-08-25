import {Job} from '../models/Job.js';


// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' });

        return res.json({
            success: true,
            message: "Jobs fetched successfully",
            jobs
        })
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.json({
            success: false,
            message: "Error fetching jobs",
        });
    }
};


// Get a single job by ID
export const getJobById = async (req, res) => {

    try {

        const {id} = req.params;
        const job = await Job.findById(id)
        .populate({ path: 'companyId', select: '-password' });

        if(!job) {
            return res.json({
                success: false, message: "Job not found"
            });
        }

        console.log(job);
        

        return res.json({
            success:true,
            message:"Job getting successfully !!",
            job
        })

    } catch (error) {
        console.error("Error fetching job:", error);
        return res.json({ success: false, message:error.message })
    }
}