export const decode = (buffer: string): string => {
    return Buffer.from(buffer, 'base64').toString();
};
