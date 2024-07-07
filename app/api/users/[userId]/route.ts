import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, context: any) {
  const { params } = context;

  const { email, firstName, age, mobile } = await request.json();
  try {
    const parsedAge = parseInt(age, 10); // Ensure 'age' is parsed as an integer

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.userId) }, // Use 'params.userId' to access the user ID from route parameters
      data: {
        email,
        firstName,
        age: parsedAge,
        mobile,
      },
    });

    return NextResponse.json(updatedUser, { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextResponse, context: any) {
  const { params } = context;

  try {
    await prisma.user.delete({
      where: { id: parseInt(params.userId) },
    });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
