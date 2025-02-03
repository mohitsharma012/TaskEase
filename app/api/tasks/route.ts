import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const client = await clientPromise;
    const db = client.db('TaskEase');
    const tasks = await db
      .collection('tasks')
      .find({ userId: decoded.userId })
      .toArray();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const { title, description, status, priority, dueDate } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('TaskEase');
    
    const result = await db.collection('tasks').insertOne({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: decoded.userId,
      createdAt: new Date(),
    });

    return NextResponse.json({
      id: result.insertedId,
      title,
      description,
      status,
      priority,
      dueDate,
      userId: decoded.userId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}