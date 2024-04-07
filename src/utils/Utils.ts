export const sleep = async (timeout: number) => new Promise(res => setTimeout(res, timeout));

export const extractErrorMessage = (err: Error) => err.message;