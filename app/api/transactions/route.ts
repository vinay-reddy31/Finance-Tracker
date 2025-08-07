import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getUserId } from "@/utils/getUserId";

export async function GET() {
  try {
    const userId = await getUserId();
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id=$1 ORDER BY date DESC",
      [userId]
    );
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    const { type, title, amount, category, description, date } = await request.json();

    // Fix: Ensure date is treated as local date
    const localDate = new Date(date + 'T12:00:00');
    
    await pool.query(
      `INSERT INTO transactions (type, title, amount, category, description, date, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [type, title, amount, category, description, localDate.toISOString().split('T')[0], userId]
    );

    return NextResponse.json({ message: "Transaction added successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
