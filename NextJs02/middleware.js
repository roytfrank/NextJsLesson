import { NextResponse } from "next/server";

export default function middleware(request) {
  //console.log(request);
  return NextResponse.next(); //forwards the incoming request to the actual destination
}

export const config = {
  matcher: "/mews",
};

//mtcher filters the request that matches the config.
