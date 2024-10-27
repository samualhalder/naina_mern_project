import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

import Header from "./components/Header";
import { isTokenValid } from "./lib/utils";
import { LeaderBoard } from "./pages/LeaderBoard";

function App() {
  const token = localStorage.getItem("token") as string;

  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
