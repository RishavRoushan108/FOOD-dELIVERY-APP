"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/next.svg";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { cartContext } from "../context/cartcontext";
import toast from "react-hot-toast";

const Header = () => {
  const pathname = usePathname();
  const route = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);
      toast.success("logout successful");
    } catch (err) {
      toast.error("logout failed");
      console.log(err);
    } finally {
      localStorage.removeItem("restaurantUser");
      route.push("/restaurant");
    }
  };
  const { cartlist, setcartlist } = useContext(cartContext);

  return (
    <div className="h-30 bg-[#4CB572] flex items-center justify-between text-white">
      <Image
        src={"/logo.png"}
        alt="A description of the image"
        width={250}
        height={300}
        // width and height are automatically inferred
        className="pl-2 rounded-[10%]"
      />
      <ul className="flex flex-row mr-20 gap-10">
        {pathname.startsWith("/restaurant/hotel") && (
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
              <Link href="/restaurant/hotel/dashboard/profile">Profile</Link>
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
