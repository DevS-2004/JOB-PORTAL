import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.company = await Company.findById(decoded.id).select("-password");

        if (!req.company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        next(); 
    } catch (error) {
        res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
};
