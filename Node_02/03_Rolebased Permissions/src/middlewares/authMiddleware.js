import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        //     if (err) res.status(403).json("Token is not valid!");
        //     req.user = user;
        //     next();
        // });

        if(!token) {
            return res
            .status(401)
            .json("No Token, Authorization Denied!");
        }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                console.log('The decoded user is: ',req.user);
                next();
            } catch (err) {
                res.status(400).json({message: `Token is not valid! `})
            }

    } else {
        return res.status(401).json("You are not authenticated!");
    }
};


export default verifyToken;