import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Cookies from "js-cookie";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    const response = await fetch(`${process.env.API_URL}/logout/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token.value}`,
      },
    });
    Cookies.remove("token");
    if (response.ok) {
      console.log("Sucessfull logout", response);
      request.cookies.delete("token");
    } else {
      console.error("Failed to logout:", response.statusText);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({ error: "logout failed" });
  }
}
