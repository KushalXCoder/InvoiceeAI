import connectDb from "@/lib/helper/connectDb";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async(req: NextRequest) => {
    try {
        await connectDb();
        const { email, password } = await req.json();

        const user = await User.findOne({email: email});
        if(user) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            email,
            password : hashedPassword,
        });

        const token = jwt.sign({email}, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });

        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
        });

        return NextResponse.json({message: "User successfully registered", user: newUser}, {status: 200});   
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error registering user", error}, {status: 400});
    }
}