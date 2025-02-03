import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('TaskEase');
    const users = db.collection('users');

    if (action === 'signup') {
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await users.insertOne({
        _id: new ObjectId(),
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      const token = jwt.sign(
        { userId: result.insertedId.toString(), email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({ token, userId: result.insertedId.toString() });

    } else if (action === 'login') {
      const user = await users.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }


      const token = jwt.sign(
        { userId: user._id.toString(), email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({ token, userId: user._id.toString() });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}