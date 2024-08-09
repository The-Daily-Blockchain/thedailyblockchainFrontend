import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  //   const token = request.cookies.token;
  // const headersd = headers();
  // const token = headersd.get("Authorization");

  if (token) {
    const response = await fetch(`${process.env.API_URL}/logout/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token.value}`,
      },
    });
    console.log(token);
    if (response.ok) {
      console.log("Sucessfull logout", response);
      cookies().delete("token");
      // request.cookies.delete("token");
      return NextResponse.redirect(`${baseUrl}/`);
    } else {
      console.error("Failed to logout:", response.statusText);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({ error: "logout failed" });
  }
}
