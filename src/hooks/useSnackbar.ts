import { useState } from "react";

export function useSnackbar() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [hasNoAnswer, setHasNoAnswer] = useState(false);
    
    function showSuccessSnackbar() {
        setIsSuccess(true);
    }
    function hideSuccessSnackbar() {
        setIsSuccess(false);
    }
    
    function showNoAnswerSnackbar() {
        setHasNoAnswer(true);
    }
    
    function hideNoAnswerSnackbar() {
        setHasNoAnswer(false);
    }
    
    return {
        isSuccess,
        hasNoAnswer,
        showSuccessSnackbar,
        hideSuccessSnackbar,
        showNoAnswerSnackbar,
        hideNoAnswerSnackbar
    }
    
}