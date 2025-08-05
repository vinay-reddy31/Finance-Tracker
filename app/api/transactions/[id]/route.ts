import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getUserId } from "@/utils/getUserId";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // ✅ params is Promise
) {
  try {
    const { id } = await context.params; // ✅ Await params
    const userId = await getUserId();
    const { type, title, amount, category, description, date } = await request.json();

    const result = await pool.query(
      `UPDATE transactions 
       SET type=$1, title=$2, amount=$3, category=$4, description=$5, date=$6
       WHERE id=$7 AND user_id=$8`,
      [type, title, amount, category, description, date, id, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Transaction not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction updated successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // ✅ params is Promise
) {
  try {
    const { id } = await context.params; // ✅ Await params
    const userId = await getUserId();
    const result = await pool.query(
      "DELETE FROM transactions WHERE id=$1 AND user_id=$2",
      [id, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Transaction not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
