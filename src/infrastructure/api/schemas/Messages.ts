export const messages = (field: string, option?: string): Record<string, string> => ({
    'any.required': `El campo ${field} es requerido`,
    'any.only': `El valor de ${field} debe ser ${option}`,
    'string.empty': `El campo ${field} no puede estar vacío`,
    'string.base': `El campo ${field} no es un string`,
    'string.length': `El campo ${field} no puede ser vacio o tener +/- de ${option} dígitos`,
    'string.email': `El campo ${field} debe tener un arreglo de correos válidos`,
    'string.max': `El campo ${field} excede la cantidad de caracteres permitidos ${option}`,
    'string.min': `El campo ${field} debe tener minimo ${option} caracteres `,
    'string.pattern.base': `El campo ${field} solo debe contener números `,
    'number.base': `El campo ${field} no es un número`,
    'number.min': `El campo ${field} debe ser mayor o igual a 0`,
    'number.integer': `El campo ${field} no puede ser un decimal`,
    'number.greater': `El campo ${field} debe ser mayor a ${option}`,
    'boolean.base': `El campo ${field} no es un booleano`,
    'array.base': `El campo ${field} no es un arreglo`,
    'array.includesRequiredUnknowns': `El campo ${field} debe tener al menos 1 item`,
});
