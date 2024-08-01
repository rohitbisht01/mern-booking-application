import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleImageDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  // console.log(existingImageUrls?.length);

  return (
    <div>
      <div className="font-bold text-gray-700 text-sm">Images</div>
      <div className="p-4 bg-gray-300 rounded-md mt-1">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4 mb-2">
            {existingImageUrls.map((url) => {
              return (
                <div className="relative group">
                  <img
                    src={url}
                    alt="image"
                    className="min-h-full object-cover"
                  />
                  <button
                    onClick={(e) => handleImageDelete(e, url)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 text-white group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <input
          className="w-full text-gray-700 "
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

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
