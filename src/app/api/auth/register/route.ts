import { genrateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { UserModel } from "@/Models/User.model";
import { ApiResponse } from "@/types/api.types";
import { Register } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let body: Register = await req.json();
    let { name, email, password, number } = body;
    if (!name || !email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "All Fields are required",
        },
        {
          status: 400,
        },
      );
    }

    let isExist = await UserModel.findOne({ $or: [{ email }, { name }] });

    if (isExist) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User already Exist",
        },
        {
          status: 409,
        },
      );
    }

    const User = await UserModel.create({
      name,
      email,
      password,
      number,
    });

    const token = genrateToken({ userId: User._id.toString() });

    let response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User create sucessfully",
        data: {
          user: {
            _id: User._id,
            name: User.name,
            email: User.email,
          },
        },
      },
      { status: 201 },
    );

    // set token
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 100,
    });
    return response;
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
