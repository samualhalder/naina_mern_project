import { CiUser } from "react-icons/ci";
import { userType } from "types/user.type";

export function LeaderCard({ user, rank }: { user: userType; rank: number }) {
  return (
    <>
      <div className="p-10 flex items-center justify-between  border-2 border-black rounded-md gap-3 m-2">
        <div className="flex items-center gap-5">
          <CiUser />
          <div>
            <h1 className="text-xl">{user.firstName}</h1>
            <p>{rank}</p>
          </div>
        </div>
        <div className="text-green-600 text-lg">{user.Points}</div>
      </div>
    </>
  );
}
3
