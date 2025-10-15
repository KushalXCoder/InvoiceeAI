import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDb from "@/lib/helper/connectDb";

export const POST = async(req: NextRequest) => {
    try {
        await connectDb();
        
        const { email, password } = await req.json();

        const checkUser = await User.findOne({ email: email });
        if (!checkUser) {
            return NextResponse.redirect(new URL("/register", req.url));
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            console.log("Incorrect Password");
            return NextResponse.json({ message: "Incorrect Password" }, { status: 400 });
        }

        const token = jwt.sign({ email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });

        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
        });

        return NextResponse.json({message: "User logged in"}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error logging in", error}, {status: 400});
    }
}