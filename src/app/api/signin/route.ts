import { connect } from "@/lib/dbConnect";
import User from "@/model/users/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({
      meta: {
        code: 0,
        message: "Invalid username or password",
      },
    });
  }

  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({
      meta: {
        code: 0,
        message: "Invalid username or password",
      },
    });
  }

  const tokenData = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  };

  const tokenSecret = process.env.TOKEN_SECRET;
  if (!tokenSecret) {
    throw new Error("TOKEN_SECRET is not defined");
  }

  const token = jwt.sign(tokenData, tokenSecret, { expiresIn: "1d" });

  const isFirstTime = user.isFirstTimeLogin;

  if (isFirstTime) {
    user.isFirstTimeLogin = false;
    await user.save();
    return NextResponse.json({
      data: null,
      meta: {
        code: 1,
        token,
        message: "Welcome to the Remôtkey dashboard!",
      },
    });
  } else {
    return NextResponse.json({
      data: null,
      meta: {
        code: 1,
        token,
        message: "Welcome back!",
      },
    });
  }
}
