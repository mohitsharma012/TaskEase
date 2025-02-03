import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'string') {
            return NextResponse.json(
                { error: "Invalid token format" },
                { status: 401 }
            );
        }
        return NextResponse.json({ userId: decoded.userId, email: decoded.email });
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        );
    }
}


