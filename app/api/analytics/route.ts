import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.email;

    // Monthly stats
    const monthly = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM') AS month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transactions
      WHERE user_id = $1
      GROUP BY month
      ORDER BY month;
    `, [userId]);

    // Weekly stats
    const weekly = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('week', date), 'IYYY-IW') AS week,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transactions
      WHERE user_id = $1
      GROUP BY week
      ORDER BY week;
    `, [userId]);

    // Daily stats
    const daily = await pool.query(`
      SELECT 
        TO_CHAR(date, 'YYYY-MM-DD') AS day,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transactions
      WHERE user_id = $1
      GROUP BY day
      ORDER BY day;
    `, [userId]);

    // Category Expense
    const categoryExpense = await pool.query(`
      SELECT category, SUM(amount) AS total
      FROM transactions
      WHERE type = 'expense' AND user_id = $1
      GROUP BY category
      ORDER BY total DESC;
    `, [userId]);

    // Biggest Expense
    const biggestExpense = await pool.query(`
      SELECT title, amount, category, TO_CHAR(date, 'YYYY-MM-DD') AS date
      FROM transactions
      WHERE type = 'expense' AND user_id = $1
      ORDER BY amount DESC
      LIMIT 1;
    `, [userId]);

    return NextResponse.json({
      monthly: monthly.rows,
      weekly: weekly.rows,
      daily: daily.rows,
      categoryExpense: categoryExpense.rows,
      biggestExpense: biggestExpense.rows[0] || null
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
