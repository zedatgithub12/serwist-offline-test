"use client";

import PaymentCodeForm from "@/components/PaymentCodeForm";
import Splash from "@/components/Splash";
import { useEffect, useState } from "react";

export default function Page() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setSplash(false), 1200);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <main>
      {splash ? (
        <Splash />
      ) : (
        <div className=" w-full h-screen flex items-center justify-center">
          <p className="text-4xl ">👋 Hello I'm Home page</p>
        </div>
      )}
    </main>
  );
}
