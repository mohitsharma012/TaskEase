import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: Request) {
    const token = request.headers.get("token")
    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
        return NextResponse.json({ userId: decoded.userId, email: decoded.email });
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        );
    }
}


    //   if (!token) {
    //     return res.status(401).json({ error: "No token provided" });
    //   }

    //   try {
    //     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    //     return res.status(200).json({ userId: decoded.userId, email: decoded.email });
    //   } catch (error) {
    //     return res.status(401).json({ error: "Invalid or expired token" });
    //   }
