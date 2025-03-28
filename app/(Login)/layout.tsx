import { ReactNode } from "react";
import { poppins } from "@/lib/font";
import "@/app/globals.css"

export default function signupLayout({children}:{children:ReactNode}){
    return(
        <html>
            <body className={poppins.className}>
                <div>
                    {children}
                </div>
            </body>
        </html>
    )
}