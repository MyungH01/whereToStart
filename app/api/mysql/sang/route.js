import { NextRequest, NextResponse } from 'next/server';
import connection from '../connect';

/**
 *
 * @param {NextRequest} req
 * @param {*} param1
 */
export async function POST(req, { params }) {
	const body = await req.json();
	const { table, code } = body;

	const [rows, fields] = await connection.execute(`SELECT * from ${table} WHERE cd_cd = ${code}`);

	return NextResponse.json({ data: rows }, { status: 200 });
}
