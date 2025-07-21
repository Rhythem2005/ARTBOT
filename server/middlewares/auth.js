import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not authorised login again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            // FIXED: Changed userID to userId to match your imageController
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Not Authorised login again' });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default userAuth;