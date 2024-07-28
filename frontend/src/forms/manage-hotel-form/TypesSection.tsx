import { useForm, useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <div className="font-bold text-gray-700 text-sm">Type</div>
      <div className="grid grid-cols-5 gap-2 pt-1">
        {hotelTypes.map((item: string) => (
          <label
            key={item}
            className={
              typeWatch === item
                ? "text-white text-sm bg-gray-500 p-2 rounded-md flex justify-center items-center cursor-pointer font-semibold"
                : "text-gray-700 text-sm bg-gray-300 p-2 rounded-md flex justify-center items-center cursor-pointer"
            }
          >
            <input
              type="radio"
              value={item}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {errors.type && (
        <span className="font-medium text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypesSection;
