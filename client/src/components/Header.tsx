import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

type userInfoType = {
  firstName: string;
  email: string;
  Points: number;
};
export default function Header() {
  const [showData, setShowData] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const [userInfo, setuserInfo] = useState<Partial<userInfoType>>({});
  const userData = localStorage.getItem("user-data") as string;
  const token = localStorage.getItem("token");

  const user = JSON.parse(userData);

  useEffect(() => {
    try {
      const handleUseInfo = async () => {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/user/v1/get-users-info-id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({ userId: user.userId }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setuserInfo(data.data);
        }
      };
      handleUseInfo();
    } catch (error) {
      console.log(error);
    }
  }, [token, showData]);

  return (
    <div className="fixed shadow-lg h-[50px] w-full bg-blue-600 text-white flex justify-end items-center gap-5 px-10">
      <Link to={"/"}>
        <div className={`${pathname == "/" ? "font-bold text-lg" : ""}`}>
          Home
        </div>
      </Link>
      <Link to={"/leaderboard"}>
        <div
          className={`${pathname == "/leaderboard" ? "font-bold text-lg" : ""}`}
        >
          Leader Board
        </div>
      </Link>
      {!user && (
        <div className={`${pathname == "/signin" ? "font-bold text-lg" : ""}`}>
          <Link to="/signin">Signin</Link>
        </div>
      )}
      {user && (
        <div onClick={() => setShowData((pre) => !pre)}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}
      {showData && (
        <div className=" fixed top-20 p-4 bg-blue-600  rounded-l-xl rounded-br-xl shadow-2xl">
          <h1 className="font-bold text-xl">{userInfo?.firstName}</h1>
          <p>{userInfo?.email}</p>
          <p>Total Points : {userInfo?.Points}</p>
        </div>
      )}
    </div>
  );
}
