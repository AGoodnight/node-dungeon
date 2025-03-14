import { ErrorObject } from 'ajv';
import { ValidationError } from 'sequelize';

export const parseAJVErrors = (validationErrors: ErrorObject[]) => {
    const errors: any[] = [];
    validationErrors.forEach(error => {
        errors.push({
            param: error.params['missingProperty']
                ? error.params['missingProperty']
                : error.instancePath,
            message: error.message,
            value: error.params['missingProperty'] ? null : error.data,
        });
    });
    return errors;
};

export const parseValidationErrors = (validationErrors: ValidationError) => {
    const errors: string[] = []
    validationErrors.errors.forEach(error => {
        errors.push(error.message)
    })
    return errors
}