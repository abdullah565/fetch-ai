import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreState } from "easy-peasy";

const AppNotification = () => {
  const { notificationType } = useStoreState((state) => state.notification);

  useEffect(() => {
    switch (notificationType) {
      case "error":
        toast.error("Oops! something went wrong!");
        break;

      default:
        break;
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
};

export default AppNotification;
