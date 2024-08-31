import {useCallback, useEffect, useState} from "react";

type ValidationRule = (value: any) => { isValid: boolean, message: string }

export interface FieldConfig {
    initialValue: any;
    validate?: ValidationRule;
}

export function useDialogForm<T extends Record<string, FieldConfig>>(fields: T | null) {
    const [values, setValues] = useState<Record<string, any>>(() =>
        fields ? Object.entries(fields).reduce((acc, [key, config]) => {
            acc[key] = config.initialValue;
            return acc;
        }, {} as Record<string, any>) : {}
    );

    const [errors, setErrors] = useState<Record<string, string>>(() =>
        fields ? Object.keys(fields).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {} as Record<string, string>) : {}
    );

    const [isValid, setIsValid] = useState(true);

    const validateField = useCallback((field: string, value: any) => {
        if (!fields) return true;
        const config = fields[field];
        if (!config) return true;
        const result = config.validate(value);
        setErrors(prev => ({ ...prev, [field]: result.isValid ? '' : result.message }));
        return result.isValid;
    }, [fields]);

    const setValue = useCallback((field: string, value: any) => {
        setValues(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    }, [validateField]);

    const validateAll = useCallback(() => {
        if (!fields) return true;
        let formIsValid = true;

        for (const [key, value] of Object.entries(values)) {
            if (fields[key] && !fields[key].validate) continue;
            const fieldIsValid = validateField(key, value);
            if (!fieldIsValid) formIsValid = false;
        }
        setIsValid(formIsValid);
        return formIsValid;
    }, [fields, values, validateField]);

    useEffect(() => {
        validateAll();
    }, [validateAll]);

    return { values, errors, setValue, validateAll, isValid };
}