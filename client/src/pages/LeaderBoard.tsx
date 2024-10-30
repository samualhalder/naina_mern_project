import { LeaderCard } from "@/components/LeaderCard";
import { useEffect, useState } from "react";
import { userType } from "types/user.type";

type leaderType = {
  date: string;
  pointsAwarded: number;
};
export function LeaderBoard() {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [userHistory, setUserHistory] = useState<Partial<leaderType[]>>([]);
  const [openModal, setOpenModal] = useState(false);
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

  const handleClick = async (username: string) => {
    setOpenModal(true);
    setUsername(username);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/user/v1/your-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setUserHistory(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userHistory);

  return (
    <>
      <div className="min-h-screen flex flex-col gap-4">
        <h1 className="text-black mt-12 mx-auto text-4xl">Leader Board</h1>
        <div className="mt-12">
          {users
            ?.sort((a, b) => b.Points - a.Points)
            .map((user, ind) => (
              <div
                onClick={() => handleClick(user.username)}
                key={user.userId}
                className="m-15"
              >
                <LeaderCard user={user} rank={ind + 1} />
              </div>
            ))}
        </div>
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-11/12 max-w-lg p-6 rounded-md shadow-lg">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-lg font-semibold">
                  Claim History of {username}
                </h3>
                <button
                  className="text-gray-600 hover:text-gray-900 text-xl font-bold"
                  onClick={() => setOpenModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="mt-4 max-h-64 overflow-y-auto">
                {userHistory &&
                  userHistory?.map((history) => (
                    <div className="  border-b-2 p-2 m-2">
                      <p>Date : {history?.date}</p>
                      <p>Point Awarded:{history?.pointsAwarded}</p>
                    </div>
                  ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  onClick={() => setOpenModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
