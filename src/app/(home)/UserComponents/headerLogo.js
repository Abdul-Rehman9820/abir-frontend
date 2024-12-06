'use client'
import Link from "next/link";

import { usePathname } from "next/navigation"; // Import usePathname hook

export default function headerLogo() {

    const pathname = usePathname(); // Get the current pathname


    return (

        <>


            {pathname !== "/" && (

                <div className="container mx-auto">
                    <div className="navbar-header navbar-header-custom">
                        <div className="topbar1 flex justify-center items-center">

                            <Link href="/" className="navbar-brand logodefault">
                                <img
                                    className="logo"
                                    src="/custom_images/Abillogo_transparent.png"
                                    alt="logo"
                                />
                            </Link>

                        </div>

                    </div>
                </div>

            )}


        </>



    )
}
