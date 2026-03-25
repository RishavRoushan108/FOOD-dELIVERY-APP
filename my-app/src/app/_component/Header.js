"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/next.svg";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { cartContext } from "../context/cartcontext";

const Header = () => {
  const pathname = usePathname();
  const route = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    route.push("/restaurant");
  };
  const { cartlist, setcartlist } = useContext(cartContext);

  return (
    <div className="h-30 bg-[#4CB572] flex items-center justify-between text-white">
      <Image
        src={logo}
        alt="A description of the image"
        width={120}
        height={40}
        // width and height are automatically inferred
      />
      <ul className="flex flex-row mr-20 gap-10">
        <li>
          <Link href="/">Home</Link>
        </li>
        {pathname === "/restaurant" && (
          <>
            <li>
              <Link href="/restaurant">signin/signup</Link>
            </li>
          </>
        )}
        {pathname.startsWith("/restaurant/hotel/dashboard") && (
          <>
            <li>
              <Link href="/restaurant/hotel/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/restaurant/hotel/dashboard/location">
                Setlocation
              </Link>
            </li>
            <li>
              <Link href="/restaurant/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
        {pathname.startsWith("/restaurant/user") && (
          <>
            <li>
              <Link href="/restaurant/user/setlocation">Setlocation</Link>
            </li>
            <li>
              <Link href="/restaurant/user/cart">
                cart{cartlist?.length > 0 ? "(" + cartlist?.length + ")" : null}
              </Link>
            </li>
            <li>
              <Link href="/restaurant/user/orders">Orders</Link>
            </li>
            <li>
              <Link href="/restaurant/user/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default Header;
