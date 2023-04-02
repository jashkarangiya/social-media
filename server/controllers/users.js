import User from "../models/User";

// Read
export const getUser = async(req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findId(id);
        res.status(200).json({})
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
}

// export