import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export function checkAuth(request: NextRequest) {
  const hasToken = request.cookies.get("token");

  if (hasToken) {
    return NextResponse.next();
  } else {
    redirect("/");
  }
}
