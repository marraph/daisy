import {useCallback, useState} from "react";

export type ValidationRule = (value: string) => { isValid: boolean; message: string };

type ValidationStatus = 'idle' | 'error' | 'warning' | 'success'

interface UseInputValidationProps {
    initialValue?: string;
    validationRules: ValidationRule[];
    warningBuffer?: number;
    successMessage?: string;
    warningMessage?: string;
}

export function useInputValidation({ initialValue = '', validationRules, warningBuffer = 0, successMessage, warningMessage }: UseInputValidationProps) {
    const [value, setValue] = useState(initialValue);
    const [status, setStatus] = useState<ValidationStatus>('idle');
    const [message, setMessage] = useState('');

    const validateInput = useCallback(() => {
        if (!validationRules) return;
        let errorCount = 0;
        let errorMessage = '';

        for (const rule of validationRules) {
            const { isValid, message } = rule(value);
            if (isValid) continue;
            errorCount++;
            if (!errorMessage) errorMessage = message;
        }

        if (errorCount === 0) {
            setStatus('success');
            setMessage(successMessage ||'Input is valid');
        } else if (errorCount <= warningBuffer && warningMessage) {
            setStatus('warning');
            setMessage(warningMessage);
        } else {
            setStatus('error');
            setMessage(errorMessage);
        }
    }, [successMessage, validationRules, value, warningBuffer, warningMessage]);

    return { value, setValue, status, message, validateInput };
}