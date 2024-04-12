import { API_URL } from "@/app/config";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const cookieToken = request.cookies.get("token");
  // console.log(cookieToken);
  //   const token = request.cookies.token;
  const headersd = headers();
  const token = headersd.get("Authorization");
  console.log(token);

  if (token) {
    const response = await fetch(`${API_URL}/logout/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(token);
    if (response.ok) {
      console.log("Sucessfull logout", response);
      request.cookies.delete("token");
      // return NextResponse.redirect(`${baseUrl}/`);
      return Response.json("Sucess");
    } else {
      console.error("Failed to logout:", response.statusText);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({ error: "logout failed" });
  }
}
