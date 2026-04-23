"use client";
import Providers from "../providers";
import React from "react";
import "../styles/globals.css";
import { NavMenu } from "../components/NavMenu";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head>
        <title>Cheffelo take-home test</title>
      </head>
      <body className="max-w-screen-lg mx-auto">
        <Providers>
          <NavMenu />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
