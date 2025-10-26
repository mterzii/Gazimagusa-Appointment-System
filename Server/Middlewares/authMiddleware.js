const JWT = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]; // Bearer token
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ 
                success: false, 
                message: "Unauthorized access" });
        

        }
        else {
            req.user = decoded; // Attach user info to request object  //!!KULLANILIR req.user.id= decoded.id
            next(); 
        }
    })
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        res.status(500).send({ 
            success: false, 
            message: "Error in Auth API" });
    }
}
