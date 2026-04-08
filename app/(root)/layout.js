import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import TopBar from "@components/TopBar";
import BottomBar from "@components/BottomBar";
import CallWrapper from "@components/CallWrapper";
import { ContextProvider } from "@components/Context";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Halo Medi App",
  description: "A Next.js 14 Chat App ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-2`}>
        <Provider>
          <ContextProvider>
            <TopBar />
            {children}
            <BottomBar />
            <CallWrapper />
          </ContextProvider>
        </Provider>
      </body>
    </html>
  );
}
