import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/Models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { IResume } from "@/types/resume.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    // const body: IResume = await req.json();
    const userId = await getCurrentUser();
    const newResume = await ResumeModel.create({
      user_id: userId,
      title: "",
      summary: "",
      personalInfo: {},
      workExperience: [],
      projects: [],
      skills: [],
      certifications: [],
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "You'r Resume created Successfully",
        data: newResume,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server Error",
      },
      { status: 500 },
    );
  }
}
