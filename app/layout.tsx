import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeTemplate from "./_commons/components/templates/home.templates";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s Depoiq",
    default: "DepoIq",
  },
  description: "AI deposition Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <AntdRegistry>
          {/* <ApolloWrapper> */}
          <HomeTemplate>
            <ToastContainer />
            {children}
          </HomeTemplate>
          {/* </ApolloWrapper> */}
        </AntdRegistry>
      </body>
    </html>
  );
}
