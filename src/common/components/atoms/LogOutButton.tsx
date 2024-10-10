"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

export const LogOutButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allowedPaths = ["/dashboard", "/add-property", "/edit-property"];
  if (!isMounted || !allowedPaths.includes(pathName)) {
    return null;
  }

  const logOut = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (response.ok) {
      router.push("/signin");
    }
  };

  return (
    <Button
      text="Logout"
      className="rounded-r_05 bg-C_013C3C"
      onClick={logOut}
    />
  );
};
