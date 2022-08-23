import validator from 'validator';
const { isAlpha, isCurrency, isEmail, isEmpty, isFloat, isInt, isLength } = validator;

export const validateName = (name: string): boolean => {
    const correctType = typeof name === 'string';
    return correctType && isAlpha(name, 'en-US', { ignore: " -,'." }) && !isEmpty(name) && isLength(name, { min: 1, max: 50 });
};

export const validateEmail = (email: string): boolean => {
    const correctType = typeof email === 'string';
    return correctType && isEmail(email) && !isEmpty(email) && isLength(email, { min: 1, max: 254 });
};

export const validateCurrency = (input: string): boolean => {
    const correctType = typeof input === 'string';
    return correctType && isCurrency(input, { allow_negatives: false, digits_after_decimal: [0, 1, 2] }) && !isEmpty(input) && isLength(input, { min: 1, max: 15 });
};

export const validateNumber = (num: number): boolean => {
    const numString = num + '';
    const correctType = typeof num === 'number';
    return correctType && (isFloat(numString, { min: 0, max: 25 }) || isInt(numString, { min: 1, max: 50 }));
};

export const validateDate = (date: string): boolean => {
    const correctType = typeof date === 'string';
    const correctFormat = new RegExp('^(0[1-9]|10|11|12)/20[0-9]{2}$').test(date);
    return correctType && correctFormat && !isEmpty(date) && isLength(date, { min: 7, max: 7 });
};