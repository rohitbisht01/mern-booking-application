import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold mb-3">Add Hotel</h2>

      <label className="font-bold text-gray-700 text-sm flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full mt-1 py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="font-medium text-red-500">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex items-center justify-between gap-4">
        <label className="font-bold text-gray-700 text-sm flex-1">
          City
          <input
            type="text"
            className="border rounded w-full mt-1 py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="font-medium text-red-500">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="font-bold text-gray-700 text-sm flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full mt-1 py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="font-medium text-red-500">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>

      <label className="font-bold text-gray-700 text-sm flex-1">
        Description
        <textarea
          rows={5}
          className="border rounded w-full mt-1 py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="font-medium text-red-500">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="font-bold text-gray-700 text-sm max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full mt-1 py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="font-medium text-red-500">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label className="font-bold text-gray-700 text-sm max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2  mt-1 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="font-medium text-red-500">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
