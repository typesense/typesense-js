export default class TypesenseError extends Error {
    httpStatus?: number;
    httpBody?: string;
    constructor(message?: string, httpBody?: string, httpStatus?: number);
}
