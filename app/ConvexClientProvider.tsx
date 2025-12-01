"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { ReactNode } from "react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL="http://127.0.0.1:3210");
const backendUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://localhost:3210";
const convex = new ConvexReactClient(backendUrl);

export default React.memo( function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
})
