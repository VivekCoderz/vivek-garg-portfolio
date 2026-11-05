"use client";
import { MotionConfig } from "motion/react";

// Respects the visitor's "reduce motion" OS setting for every animation.
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
