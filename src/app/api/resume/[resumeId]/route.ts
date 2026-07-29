import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/Models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();
    const user = await getCurrentUser();

    const { resumeId } = await params;

    const resume = await ResumeModel.findOne({
      _id: resumeId,
    //   user_id: user.userId,
    });

    if (!resume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 400 },
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume Fatched Successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Errors in the Resume Get API", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server Error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    const body = await req.json();
    const { resumeId } = await params;

    const updatedResume = await ResumeModel.findByIdAndUpdate(
      {
        _id: resumeId,
        user_id: user.userId,
      },
      {
        $set: body,
      },
      { new: true, runValidators: true },
    );

    if (!updatedResume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "updatedResume fail to update",
        },
        { status: 400 },
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume update successfully",
        data: updatedResume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server Error",
      },
      { status: 500 },
    );
  }
}
