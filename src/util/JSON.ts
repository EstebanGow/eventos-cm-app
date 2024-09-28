export const parse = <T>(data: string): T | null => {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.log('ERROR__', error);
        return null;
    }
};
