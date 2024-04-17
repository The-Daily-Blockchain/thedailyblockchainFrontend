import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_URL } from "./app/config";

export async function middleware(request: NextRequest) {
  const hasToken = request.cookies.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (hasToken) {
    try {
      const response = await fetch(`${API_URL}/validate_token/`, {
        headers: {
          Authorization: `Token ${hasToken.value}`,
        },
      });
      if (response.status == 200) {
        return NextResponse.next();
      } else {
        console.error("Token validation failed:", response.statusText);
        return NextResponse.redirect(`${baseUrl}/login`);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.redirect(`${baseUrl}/login`);
    }
  } else {
    return NextResponse.redirect(`${baseUrl}/login`);
  }
}

export const config = {
  matcher: ["/createarticle", "/createpost"],
};
