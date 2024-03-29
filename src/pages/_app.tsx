import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable} max-w-7xl my-0 mx-auto place-content-center justify-center`}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
