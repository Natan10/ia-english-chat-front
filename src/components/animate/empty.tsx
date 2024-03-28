"use client";
import Lottie from "lottie-react";

import animation from "@/assets/animations/empty-box.json";

export function Empty() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie
        animationData={animation}
        loop={true}
        className="size-24 md:size-60"
      />
    </div>
  );
}
