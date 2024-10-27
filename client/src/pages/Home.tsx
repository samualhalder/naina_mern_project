import { useEffect, useState } from "react";
import { userType } from "types/user.type";
import { Toaster } from "@/components/ui/toaster";
import UserCard from "@/components/UserCard";

export function Home() {
  const token = localStorage.getItem("token");
  const [users, setusers] = useState<userType[] | null>(null);

  useEffect(() => {
    try {
      const handleUsers = async () => {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/user/v1/get-users`
        );
        const data = await response.json();
        if (response.ok) {
          setusers(data.data);
        }
      };
      handleUsers();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="mt-12">
        {users?.map((user) => (
          <UserCard user={user} key={user.userId} />
        ))}
      </div>
      <Toaster />
    </div>
  );
}
