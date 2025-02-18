"use client";

import { useRouter } from "next/navigation";

const DashboardForm = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        sessionStorage.removeItem("userId");
        router.push("/login");
      }}
    >
      Logout
    </button>
  );
};

export default DashboardForm;
