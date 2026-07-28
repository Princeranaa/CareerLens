import { GenerateProject } from "@/lib/ai.type";
import { generateAiContent } from "@/lib/gemini";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateProject = await req.json();
    const { experienceLevel, techStack, jobtitle } = body;
    
    if (!experienceLevel || !techStack || !jobtitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
          You are an expert technical recruiter and professional resume writer specializing in ATS-optimized resumes.

          Generate a professional project description for the following project.

          Job Title: ${jobtitle}
          
          Experience Level: ${experienceLevel}
          Tech Stack: ${techStack.join(", ")}

          Requirements:
          - Generate ONE professional project description.
          - The description must be between 70 and 120 words.
          - Write it as a single paragraph.
          - Do NOT use bullet points, numbering, or line breaks.
          - Focus on technical contributions and implementation.
          - Naturally incorporate the provided tech stack.
          - Highlight responsibilities such as feature development, API development, database integration, authentication, state management, responsive UI, performance optimization, and reusable components where appropriate.
          - Use strong action verbs such as Developed, Built, Implemented, Integrated, Designed, or Optimized.
          - Do NOT invent technologies that are not included in the provided tech stack.
          - Do NOT fabricate measurable achievements or statistics.
          - Keep the writing ATS-friendly, professional, and resume-ready.
          - Return ONLY the paragraph.
          - Do NOT include markdown, headings, explanations, quotes, or code blocks.
        `;

    const result = await generateAiContent(prompt);
    let projectDes = result;

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "projectDes Created",
        data: {
          projectDes,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
