import { Inter } from "next/font/google";
import "./globals.css";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FairyTailor",
  description: "A storytelling app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
