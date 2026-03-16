const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ admin: { email: admin.email, role: admin.role }, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    res.json({ admin: { email: req.admin.email, role: req.admin.role } });
};
