import { UserTable, db } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const { rows } = await sql`SELECT * FROM todo;`;
    const rows = await db.select().from(UserTable);
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

//create POST which accept id, text and completed then insert into todo table
export async function POST(request: NextRequest) {
  const { id, text, completed } = await request.json();

  try {
    // const { rows } =
    //   await sql`INSERT INTO todo VALUES ( ${id} ,${text}, ${completed}  ) RETURNING *`;
    const rows = await db
      .insert(UserTable)
      .values({ id, text, completed })
      .returning();
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

//create DELETE which accept id then delete id's record from todo table
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  try {
    const rows = await db
      .delete(UserTable)
      .where(eq(UserTable.id, id))
      .returning();
    // const { rows } = await sql`DELETE FROM todo WHERE id = ${id} RETURNING *`;
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

//create PATCH which accept id and completed then updates the id's record from todo table
export async function PATCH(req: NextRequest) {
  const { id, completed } = await req.json();
  try {
    // const { rows } =
    //   await sql`update todo set completed = ${completed} where id = ${id} returning *`;
    const rows = await db
      .update(UserTable)
      .set({ completed })
      .where(eq(UserTable.id, id))
      .returning();
    return NextResponse.json({ "updated=": rows }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

//create PUT which accept id and text then updates the id's record from todo table
export async function PUT(req: NextRequest) {
  const { id, text } = await req.json();
  try {
    // const { rows } =
    //   await sql`update todo set text = ${text} where id = ${id} returning *`;
    const rows = await db
      .update(UserTable)
      .set({ text })
      .where(eq(UserTable.id, id))
      .returning();
    return NextResponse.json({ "updated=": rows }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
