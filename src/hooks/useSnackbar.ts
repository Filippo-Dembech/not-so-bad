import { useState } from "react";

export function useSnackbar() {
    const [isSuccess, setIsSuccess] = useState(false);
    
    
    function showSuccessSnackbar() {
        setIsSuccess(true);
    }
    function hideSuccessSnackbar() {
        setIsSuccess(false);
    }
    
    return {
        isSuccess,
        showSuccessSnackbar,
        hideSuccessSnackbar,
    }
    
}