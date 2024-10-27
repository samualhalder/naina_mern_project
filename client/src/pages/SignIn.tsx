import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";

export function SignIn() {
  const [fromData, setFromData] = useState({
    username: "",
    password: "",
  });

  const navigator = useNavigate();

  const [errorMessage, seterrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    seterrorMessage(null);
    try {
      const { password, username } = fromData;
      if (!password || !username) {
        seterrorMessage("fill all the fields");
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Example with localStorage
        localStorage.setItem("token", data.token);
        const userObject = {
          userId: data.data._id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          username: data.data.username,
          Points: data.data.Points,
        };
        localStorage.setItem("user-data", JSON.stringify(userObject));

        navigator("/");
      } else {
        seterrorMessage(data.message);
      }
    } catch (error) {
      seterrorMessage("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className=" shadow-2xl w-[400px] min-h-[600px] p-10 flex justify-center items-center flex-col relative gap-3 rounded-md">
        <h1 className=" absolute top-1 text-3xl tracking-widest font-sans font-semibold">
          Sign In
        </h1>
        <form className="w-full flex  flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" className="mb-4 text-sm text-gray-400">
              Your Username
            </Label>

            <Input
              className="w-[95%]"
              type="text"
              name="username"
              value={fromData.username}
              onChange={(e) => handleChange(e)}
              autoComplete="current-email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-4 text-sm text-gray-400">
              Your Password
            </Label>

            <Input
              className="w-[95%]"
              type="password"
              name="password"
              value={fromData.password}
              onChange={(e) => handleChange(e)}
              autoComplete="current-password"
            ></Input>
          </div>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertTitle>Opps!</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button className="w-[95%]" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign Ip"}
          </Button>
        </form>
        <Link
          className="text-blue-500 mt-10 hover:text-blue-300"
          to={`/signup`}
        >
          dont have an account? sign up
        </Link>
      </div>
    </div>
  );
}
