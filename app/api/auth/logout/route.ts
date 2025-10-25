import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async() => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return NextResponse.json({ message: "Token deleted" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error deleting token" }, { status: 400 });
    }
}