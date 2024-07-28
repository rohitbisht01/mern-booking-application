import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-clients";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({
        message: "User logged in",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="font-bold text-gray-700 text-sm flex-1">
        Email
        <input
          type="text"
          className="border rounded w-full mt-1 py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="font-medium text-red-500">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className="font-bold text-gray-700 text-sm flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full mt-1 py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="font-medium text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>

      <span className="flex justify-between items-center mt-5">
        <span className="text-sm">
          Not registered?{" "}
          <Link to={"/register"} className="underline">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-medium rounded-lg hover:bg-blue-500 text-sm"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
