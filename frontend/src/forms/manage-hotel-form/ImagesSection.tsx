import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <div className="font-bold text-gray-700 text-sm">Images</div>
      <div className="p-4 bg-gray-300 rounded-md mt-1">
        <input
          className="w-full text-gray-700 "
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "Atleast one image should be adeded";
              }
              if (totalLength > 6) {
                return "Total number of images should not exceed more than 6";
              }

              return true;
            },
            required: "This field is required",
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="font-medium text-red-500">
          {errors.imageFiles?.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
