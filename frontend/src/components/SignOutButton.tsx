import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      showToast({
        message: "Logged out",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const handleLogoutClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="flex items-center cursor-pointer text-blue-600 px-3 rounded-md font-bold hover:bg-gray-100 bg-white"
      onClick={handleLogoutClick}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
