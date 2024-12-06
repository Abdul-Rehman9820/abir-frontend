
import { useRouter,usePathname } from 'next/navigation';
import Link from "next/link";
import Cookies from 'js-cookie';


export default function myNav() {

    const router = useRouter();

    const currentRoute = usePathname();
    const isActive = (path) => currentRoute === path;

   const handelLogout = ()=> {
       Cookies.remove('token');
       router.push('/login'); // Redirect to the login page
    };

    return (
        <nav className="flex flex-col space-y-2">
            <Link href="/my-account" className={`transition-colors  px-4 py-2 ${isActive('/my-account') ? 'text-white abirBG' : ''}`}>
                Dashboard
            </Link>
            <Link href="/my-account/recipes-pdf" className={`transition-colors  px-4 py-2 ${isActive('/my-account/recipes-pdf') ? 'text-white abirBG' : ''}`}>
                Recipe PDF
            </Link>
            <Link href="/my-account/recipes-videos" className={`transition-colors  px-4 py-2 ${isActive('/my-account/recipes-videos') ? 'text-white abirBG' : ''}`}>
                Recipe Videos
            </Link>
            <Link href="/my-account/packages" className={`transition-colors  px-4 py-2 ${isActive('/my-account/packages') ? 'text-white abirBG' : ''} `}>
                Packages
            </Link>
            <button onClick={handelLogout} className={`text-left transition-colors  px-4 py-2`}>
                Logout
            </button>
        </nav>
    )
}
