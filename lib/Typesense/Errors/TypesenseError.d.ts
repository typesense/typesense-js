export default class TypesenseError extends Error {
    httpStatus?: number;
    constructor(message?: string);
}
