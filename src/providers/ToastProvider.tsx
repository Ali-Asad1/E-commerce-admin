"use client";

import { DefaultToastOptions, Toaster } from "react-hot-toast";

const options: DefaultToastOptions = {
  duration: 5000,
  loading: {
    duration: 9999999,
  },
};

const ToastProvider = () => {
  return <Toaster toastOptions={options} />;
};
export default ToastProvider;
