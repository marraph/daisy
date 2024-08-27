import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/utils/ThemeProvider";

const geist = GeistSans();

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={geist.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
