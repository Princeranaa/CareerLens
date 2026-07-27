import { Generatsummary } from "@/lib/ai.type";
import { generateAiContent } from "@/lib/gemini";
import { ApiResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const body: Generatsummary = await req.json();
    const { experienceLevel, skills, jobtitle } = body;

    if (!experienceLevel || !skills || !jobtitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
          Act as an expert ATS resume writer.
          Create a professional resume summary based on the details below.

          Job Title: ${jobtitle}
          Experience Level: ${experienceLevel}
          Skills: ${skills}

          Rules:
          - Return ONLY the resume summary.
          - The summary MUST contain **50 to 80 words**. Do not exceed 80 words or write fewer than 50 words.
          - Do not include headings, labels, bullet points, markdown, quotes, or any extra text.
          - Use a professional, ATS-friendly, and impactful tone.
          - Naturally include the provided job title, experience level, and technical skills.
          - Highlight technical expertise, problem-solving, collaboration, and the ability to deliver high-quality software.
          - Do not fabricate years of experience, projects, achievements, certifications, or technologies.
          - Return plain text only.
          `;

    const result = await generateAiContent(prompt);
    const summary = result;

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Summary Created",
        data: {
          summary,
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
