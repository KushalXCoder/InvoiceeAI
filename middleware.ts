import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async(req: NextRequest) => {
    const session = await auth();
    if(!session?.user) {
        return NextResponse.redirect(new URL("/register", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/invoice"],
}