import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      showToast({ message: "User Registered", type: "SUCCESS" });
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

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="font-bold text-gray-700 text-sm flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full mt-1 py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="font-medium text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label className="font-bold text-gray-700 text-sm flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full mt-1 py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="font-medium  text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      <label className="font-bold text-gray-700 text-sm flex-1">
        Email
        <input
          type="email"
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

      <label className="font-bold text-gray-700 text-sm flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full mt-1 py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (watch("password") !== value) {
                return "Your password do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="font-medium text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-medium rounded-lg hover:bg-blue-500 text-lg"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
