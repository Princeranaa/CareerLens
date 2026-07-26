import { genrateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { UserModel } from "@/Models/User.model";
import { ApiResponse } from "@/types/api.types";
import { Login } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let body: Login = await req.json();
    let { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Fields are required",
        },
        { status: 400 },
      );
    }

    let User = await UserModel.findOne({ email });
    if (!User) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    let matchPass = await User.comparePass(password);
    if (!matchPass) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 },
      );
    }

    const token = genrateToken({ userId: User._id.toString() });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: User._id,
            name: User.name,
            email: User.email,
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        sucess: false,
        message: "Internal Server Error",
        error,
      },
      { status: 500 },
    );
  }
}
