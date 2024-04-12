import { NextRequest, NextResponse } from "next/server";

const LogoutButton = (request: NextRequest) => {
  const token = request.cookies.get("token");
  request.cookies.delete("token");
  const handleLogout = () => {
    NextResponse.redirect("/");
  };

  return token ? <button onClick={handleLogout}>Logout</button> : null;
};

export default LogoutButton;
