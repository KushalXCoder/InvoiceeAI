import { cookies } from "next/headers";

interface TokenResult {
    found: boolean;
    token: string | null;
};

export const getToken = async () : Promise<TokenResult> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if(!token) {
            return { found: false, token: null };
        }

        return { found: true, token };
    } catch (error) {
        console.error("Error retrieving token from cookies:", error);
        return { found: false, token: null };
    }
}