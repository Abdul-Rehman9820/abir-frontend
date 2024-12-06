

import NextTopLoader from 'nextjs-toploader';
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import "./usercomponets_styles/commonglobalstyle.css";
import "./usercomponets_styles/responsive.css";

import ReduxProvider from '../ReduxProvider';

import Header from "./UserComponents/Header";
import Footer from "./UserComponents/Footer";


const robotoslab = Roboto_Slab({
  subsets: ['latin'],
  variable: "--headerFonts",  //! change it for global font 
  display: 'swap',
});



export const metadata = {
  title: "Abir Home",
  description: "Abir Life Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoslab.variable} antialiased`}>

        <NextTopLoader
          color="#6d8c54"
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
        />



        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>


      </body>
    </html>
  );
}
