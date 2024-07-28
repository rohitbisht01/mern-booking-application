import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <div className="font-bold text-gray-700 text-sm">Facilites</div>
      <div className="grid grid-cols-5 gap-2 pt-1">
        {hotelFacilities.map((facility: string) => {
          return (
            <label className="flex gap-2 text-sm" key={facility}>
              <input
                type="checkbox"
                value={facility}
                {...register("facilities", {
                  required: "This field is required",
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) return true;
                    else return "Atleast one facility is required";
                  },
                })}
              />
              <span>{facility}</span>
            </label>
          );
        })}
      </div>
      {errors.facilities && (
        <span className="font-medium text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
