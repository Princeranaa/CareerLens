import { Generatsummary } from "@/lib/ai.type";
import { generateAiContent } from "@/lib/gemini";
import { ApiResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const body: Generatsummary = await req.json();
    const { experienceLevel, skills, jobtitle } = body;

    if (!experienceLevel || !jobtitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
        You are an expert technical recruiter specializing in ATS-optimized software engineering resumes.

        Generate a list of technical skills for the following candidate.

        Job Title: ${jobtitle}
        Experience Level: ${experienceLevel}

        Requirements:
        - Return ONLY technical skills commonly expected for this role.
        - Include only real technologies, tools, frameworks, libraries, databases, programming languages, APIs, authentication technologies, package managers, version control systems, deployment platforms, and development tools.
        - Exclude soft skills, concepts, methodologies, and general knowledge areas.

        Do NOT include items such as:
        - Communication
        - Leadership
        - Teamwork
        - Problem Solving
        - Responsive Design
        - Agile
        - Scrum
        - SDLC
        - OOP
        - MVC
        - Clean Code
        - Software Development

        Prefer modern technologies that are commonly used today.

        Use official technology names.

        Examples:
        - JavaScript
        - TypeScript
        - React.js
        - Next.js
        - Node.js
        - Express.js
        - MongoDB
        - Mongoose
        - Redux Toolkit
        - RTK Query
        - Tailwind CSS
        - Material UI
        - HTML5
        - CSS3
        - Git
        - GitHub
        - Docker
        - Redis
        - Socket.IO
        - JWT Authentication
        - REST APIs
        - Postman

        Return between 12 and 18 unique skills.

        Return ONLY a valid JSON array.
    `;

    const result = await generateAiContent(prompt);
    let Skills = result;

    if (typeof Skills === "string") {
      try {
        Skills = Skills.replace(/```json\s*/gi, "")
          .replace(/```\s*/g, "")
          .trim();
          
        Skills = JSON.parse(Skills);
      } catch (err) {
        console.error("Failed to parse skills:", err);
      }
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Skills Created",
        data: {
          Skills,
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
