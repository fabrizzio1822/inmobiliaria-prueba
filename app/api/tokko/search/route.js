import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  const operation = searchParams.get("operation");
  const type = searchParams.get("type");

  const queryParams = [];

  if (location) queryParams.push(`location=${location}`);
  if (operation) queryParams.push(`operation_type=${operation}`);
  if (type) queryParams.push(`type=${type}`);

  const query = queryParams.join("&");

  try {
    const res = await fetch(`https://api.tokkosite.com/your-endpoint?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKKO_API_KEY}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data.objects); // ajusta según el formato real
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
