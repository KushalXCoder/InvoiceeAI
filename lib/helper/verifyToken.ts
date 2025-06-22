import { jwtVerify } from "jose";

const verifyToken = async (token : string) => {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
};

export default verifyToken;