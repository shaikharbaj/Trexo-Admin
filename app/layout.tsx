import "./assets/scss/globals.scss";
import "./assets/scss/theme.scss";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import Providers from "@/provider/providers";
import TanstackProvider from "@/provider/providers.client";
import DirectionProvider from "@/provider/direction.provider";
import ReduxProvider from "@/redux/redux-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <ReduxProvider>
        <TanstackProvider>
          <Providers>
            <DirectionProvider lang={lang}>{children}</DirectionProvider>
          </Providers>
        </TanstackProvider>
      </ReduxProvider>
    </html>
  );
}
