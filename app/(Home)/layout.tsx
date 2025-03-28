import { ReactNode } from "react";
import "@/app/globals.css"
import{Poppins} from "next/font/google"
const poppins = Poppins({subsets:["latin"],weight:["400","700"]})

export default function layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={poppins.className}>
  
        <main>{children}</main>
      </body>
    </html>
  );
}
