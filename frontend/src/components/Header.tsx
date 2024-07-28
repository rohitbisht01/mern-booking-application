import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  // console.log(isLoggedIn);

  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Rental.com</Link>
        </span>
        <span className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600 rounded-md"
                to="/my-booking"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600 rounded-md"
                to={"/my-hotels"}
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-blue-600 px-3 rounded-md bg-white font-bold hover:bg-gray-100"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
