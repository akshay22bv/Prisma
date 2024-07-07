import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(
      {
        success: true,
        body: users,
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json({ error: "Internal server error" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, age, mobile } = await request.json();

    const parsedAge = parseInt(age);

    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        age: parsedAge,
        mobile,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
