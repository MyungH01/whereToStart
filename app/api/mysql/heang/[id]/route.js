import { NextRequest, NextResponse } from 'next/server';
import connection from '../../connect';

/**
 *
 * @param {NextRequest} req
 * @param {*} param1
 */
export async function GET(req, { params }) {
	const [rows, fields] = await connection.execute(`SELECT * from sss WHERE ab_cd = ${params.id}`);
	return NextResponse.json({ data: rows }, { status: 200 });
}
