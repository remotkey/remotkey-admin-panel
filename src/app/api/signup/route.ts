import bcryptjs from "bcryptjs";
import User from "@/model/users/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, username, password } = reqBody;

  const userByUsername = await User.findOne({ username });

  if (userByUsername) {
    return NextResponse.json({
      meta: {
        code: 0,
        message:
          "The username already exists. Kindly use a different username.",
      },
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    return NextResponse.json({
      meta: {
        code: 0,
        message:
          "An account with this email address already exists. Kindly use a different email address to proceed.",
      },
    });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  if (savedUser) {
    return NextResponse.json({
      meta: {
        code: 1,
        message:
          "Your account has been successfully created. Please log in to continue.",
      },
    });
  }
  return NextResponse.json({
    meta: {
      code: 0,
      message: "User creation failed",
    },
  });
}
