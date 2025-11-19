import React from "react";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02b7b4f34f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Branding"
          width={1000}
          height={1000}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex h-full items-center justify-center">
          <h1 className="text-4xl font-bold text-white">ThinkInk</h1>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}