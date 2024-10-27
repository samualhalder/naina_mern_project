import { userType } from "types/user.type";
import { CiUser } from "react-icons/ci";
import { useToast } from "@/hooks/use-toast";

export default function UserCard({ user }: { user: userType }) {
  const { toast } = useToast();

  const handleClainPoints = async () => {
    try {
      await fetch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/user/v1/claim-points`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user.username }),
        }
      );
      toast({
        title: "Success",
        description: `Point claimed successfully for ${user.username} `,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="p-10 h-[100px] flex items-center justify-between  border-2 border-black rounded-md gap-3 m-2"
      onClick={handleClainPoints}
    >
      <div className="flex items-center gap-5">
        <CiUser />
        <div>
          <h1 className="text-xl">{user.firstName}</h1>
        </div>
      </div>
      <div className="text-green-600">{user.Points}</div>
    </div>
  );
}
