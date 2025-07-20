import { jwtVerify } from "jose";

const verifyToken = async (token : string) => {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return { valid: true, expired: false, payload};
    } catch (error) {
        console.error("JWT verification failed:", error);
        if((error as Error).name === "JWTExpired") {
            return { valid: false, expired: true,  };
        }
        return { valid: false, expired: false, error };
    }
};

export default verifyToken;