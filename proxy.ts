import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)' ,  '/sign-up(.*)', "/" , "/Real-Estate"])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
     const userId = auth.userId;
    const user = await db.query("users").withIndex("by_clerkId").get(userId);

    if (!user) {
      // لو المستخدم مش موجود في الجدول، ممكن نمنعه من الدخول أو نعمل redirect
      return new Response("User not found in database", { status: 403 });
    }

    // ممكن كمان تضيف البيانات في request أو context لو حابة تستخدمها بعد كده
    (req as any).user = user;
  }
  }
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}