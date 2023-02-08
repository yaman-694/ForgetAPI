import jsonwebtoken from 'jsonwebtoken';

const parseCookies = async(request)=> {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}


const verifyToken = async (req, res, next) => {
    const cookie = await parseCookies(req);
    const token = cookie.auth;
    // console.log('mila',token)
    if (!token) return res.status(401).json({ status: "error", message: "Access Denied" });
    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_HEADER_KEY);
        // console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Invalid Token"
        });
    }
}

export default verifyToken;