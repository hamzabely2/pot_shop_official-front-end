import {toast} from "react-toastify";


export const ToastError = (mess) =>{
    toast.error(mess, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
};


export const ToastSuccess = (mess ) =>{
    toast.success(mess, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
};

export const ToastInfo = (mess ) =>{
    toast.info(mess, {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
};

export const DisplayApiErrors = (errors) => {
    for (const key in errors ) {
        if (errors.hasOwnProperty(key)) {
            const errorMessages = errors[key];
            if (Array.isArray(errorMessages)) {
                errorMessages.forEach((errorMessage) => {
                    ToastError(errorMessage);
                });
            }
        }
    }
};


