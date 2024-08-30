import {useCallback, useEffect, useState} from "react";

type ValidationRule = (value: any) => { isValid: boolean, message: string }

export interface FieldConfig {
    initialValue: any;
    validate?: ValidationRule;
}

export function useDialogForm<T extends Record<string, FieldConfig>>(fields: T) {
    const [values, setValues] = useState<Record<keyof T, any>>(() =>
        Object.entries(fields).reduce((acc, [key, config]) => {
            acc[key as keyof T] = config.initialValue;
            return acc;
        }, {} as Record<keyof T, any>)
    );

    const [errors, setErrors] = useState<Record<keyof T, string>>(() =>
        Object.keys(fields).reduce((acc, key) => {
            acc[key as keyof T] = '';
            return acc;
        }, {} as Record<keyof T, string>)
    );

    const [isValid, setIsValid] = useState(false)

    const validateField = useCallback((field: keyof T, value: any) => {
        const result = fields[field].validate(value)
        setErrors(prev => ({ ...prev, [field]: result.isValid ? '' : result.message }))
        return result.isValid
    }, [fields])

    const setValue = useCallback((field: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    }, [validateField]);

    const validateAll = useCallback(() => {
        let formIsValid = true;
        Object.entries(fields).forEach(([key, config]) => {
            const fieldIsValid = validateField(key as keyof T, values[key as keyof T]);
            if (!fieldIsValid) formIsValid = false;
        });
        setIsValid(formIsValid);
        return formIsValid;
    }, [fields, values, validateField]);

    useEffect(() => {
        validateAll();
    }, [values, validateAll]);

    return { values, errors, setValue, validateAll, isValid };
}