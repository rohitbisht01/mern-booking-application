import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <div className="font-bold text-gray-700 text-sm">Guests</div>
      <div className="grid grid-cols-2 p-6 gap-4 mt-1 bg-gray-300 rounded-md">
        <label className="font-bold text-gray-700 text-sm flex-1">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full mt-1 py-1 px-2 font-normal"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount?.message && (
            <span className="font-medium text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className="font-bold text-gray-700 text-sm flex-1">
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full mt-1 py-1 px-2 font-normal"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount?.message && (
            <span className="font-medium text-red-500">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
