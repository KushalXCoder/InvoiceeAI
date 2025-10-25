import { jwtVerify } from "jose";

const verifyToken = async (token : string) : Promise<VerifyTokenResult> => {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const typedPayload = payload as MyPayloadData;

        return { valid: true, expired: false, payload: typedPayload };
    } catch (error) {
        const err = error as Error;
        console.error("JWT verification failed:", error);
        if((err).name === "JWTExpired") {
            return { valid: false, expired: true, error: err };
        }
        return { valid: false, expired: false, error: err };
    }
};

export default verifyToken;