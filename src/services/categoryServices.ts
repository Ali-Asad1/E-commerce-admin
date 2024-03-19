import { Category } from "@prisma/client";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const createCategory = async (
  storeId: string,
  name: string,
  billboardId: string,
): Promise<Category | AxiosError<any>> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response: AxiosResponse<Category> = await axios.post(`/api/store/${storeId}/category`, {
      name,
      billboardId,
    });

    toast.success("Category created", {
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

export const editCategory = async (
  storeId: string,
  categoryId: string,
  name: string,
  billboardId: string,
): Promise<Category | AxiosError<any>> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response: AxiosResponse<Category> = await axios.patch(`/api/store/${storeId}/category/${categoryId}`, {
      name,
      billboardId,
    });

    toast.success("Category edited", {
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

export const deleteCategory = async (
  storeId: string,
  categoryId: string,
): Promise<AxiosResponse<any> | AxiosError<any>> => {
  const loadingToastId = toast.loading("Loading...");
  try {
    const response = await axios.delete(`/api/store/${storeId}/category/${categoryId}`);

    toast.success("Billboard deleted", {
      id: loadingToastId,
    });

    return response.data;
  } catch (error: any) {
    toast.error("Something went wrong", {
      id: loadingToastId,
    });
    return error;
  }
};
