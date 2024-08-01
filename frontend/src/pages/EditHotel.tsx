import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-clients";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { id } = useParams();
  const { showToast } = useAppContext();

  const { data: hotelData, isLoading } = useQuery({
    queryKey: ["single-hotel"],
    queryFn: () => apiClient.fetchMyHotelById(id || ""),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () => {
      showToast({ message: "Hotel Updated", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleHotelSave = (hotelFormData: FormData) => {
    mutation.mutate(hotelFormData);
  };

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  if (isLoading) {
    return <BeatLoader color="#145cd7" />;
  }

  return (
    <ManageHotelForm
      hotel={hotelData.hotel}
      onSave={handleHotelSave}
      isLoading={isLoading}
    />
  );
};

export default EditHotel;
