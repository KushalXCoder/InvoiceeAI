import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import verifyToken from "./lib/helper/verifyToken";

export const middleware = async(req: NextRequest) => {
    const session = await auth();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!session?.user && !token) {
        console.log("No session or no token");
        return NextResponse.redirect(new URL("/register", req.url));
    }

    if(session?.user) {
        return NextResponse.next();
    }

    if(token) {
        const decoded = await verifyToken(token);
        if(decoded.expired) {
            return NextResponse.redirect(new URL ("/login", req.url));
        }
        else if(!decoded.valid) {
            return NextResponse.redirect(new URL ("/register", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*",],
}