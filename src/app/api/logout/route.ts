import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cookieStore = cookies();
  const token = Cookies.get("token");

  if (token) {
    const response = await fetch(`${process.env.API_URL}/logout/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(token);
    if (response.ok) {
      console.log("Sucessfull logout", response);
      cookies().delete("token");
    } else {
      console.error("Failed to logout:", response.statusText);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({ error: "logout failed" });
  }
}
