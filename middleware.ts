import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {

  },
  {
    callbacks: {
      // ตรวจสอบว่ามี token ไหม ถ้าไม่มีจะเด้งไปหน้า login
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = { 
  matcher: ["/notes/:path*", "/api/notes/:path*"] 
};