import { connectDB } from "@/lib/mongodb";
import { Register } from "@/types/user.types";
import { NextRequest } from "next/server";

async function POST(req: NextRequest) {
  try {
    await connectDB();

    let body: Register = await req.json();
    let { name, email, password, number } = body;

  } catch (error) {
    console.log(error);
  }
}
