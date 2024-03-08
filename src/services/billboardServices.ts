import { Billboard } from "@prisma/client";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const createBillboard = async (
  storeId: string,
  label: string,
  imageUrl: string,
): Promise<Billboard | AxiosError<any>> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response: AxiosResponse<Billboard> = await axios.post(`/api/store/${storeId}/billboard`, {
      label,
      imageUrl,
    });

    toast.success("Billboard created", {
      id: loadingToastId,
    });

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.status === 400) {
        toast.error(error.response?.data, {
          id: loadingToastId,
        });
      }
    }
    toast.error("Something went wrong", {
      id: loadingToastId,
    });
    return error;
  }
};

export const editBillboard = async (
  storeId: string,
  billboardId: string,
  label: string,
  imageUrl: string,
): Promise<Billboard | AxiosError<any>> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response: AxiosResponse<Billboard> = await axios.patch(`/api/store/${storeId}/billboard/${billboardId}`, {
      label,
      imageUrl,
    });

    toast.success("Billboard edited", {
      id: loadingToastId,
    });

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.status === 400) {
        toast.error(error.response?.data, {
          id: loadingToastId,
        });
      }
    }
    toast.error("Something went wrong", {
      id: loadingToastId,
    });
    return error;
  }
};
