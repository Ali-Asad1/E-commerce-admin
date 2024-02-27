import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { StoreType } from "@/types/Store.type";

import { FormErrorListType } from "@/utils/fromUtils";

export const createStore = async (name: string): Promise<StoreType | AxiosError<FormErrorListType>> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response: AxiosResponse<StoreType> = await axios.post("/api/store", {
      name,
    });

    toast.success("Store created", {
      id: loadingToastId,
    });

    return response.data;
  } catch (error) {
    const responseError = error as AxiosError<FormErrorListType>;

    if (responseError.response?.status === 400) {
      toast.error("Store name already exists", {
        id: loadingToastId,
      });
    }

    toast.error("Something went wrong", {
      id: loadingToastId,
    });
    return responseError;
  }
};

export const editStore = async (storeId: string, name: string): Promise<StoreType | AxiosError<any>> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response: AxiosResponse<StoreType> = await axios.patch(`/api/store/${storeId}`, {
      name,
    });

    toast.success("Store updated", {
      id: loadingToastId,
    });

    return response.data;
  } catch (error) {
    const responseError = error as AxiosError<any>;

    if (responseError.response?.status === 400) {
      toast.error(responseError.response.data, {
        id: loadingToastId,
      });
    }

    toast.error("Something went wrong", {
      id: loadingToastId,
    });
    return responseError;
  }
};

export const deleteStore = async (storeId: string): Promise<any> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response: AxiosResponse<any> = await axios.delete(`/api/store/${storeId}`);
    toast.success("Store deleted", {
      id: loadingToastId,
    });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong", {
      id: loadingToastId,
    });
    return error as AxiosError;
  }
};
