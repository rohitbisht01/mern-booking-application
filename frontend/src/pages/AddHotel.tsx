import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isSuccess } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({
        message: "Hotel Saved",
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: "Error saving hotel",
        type: "ERROR",
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={!isSuccess} />;
};

export default AddHotel;
