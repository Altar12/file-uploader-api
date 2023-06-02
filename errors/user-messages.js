const printableSize = (size) => {
    const units = [
        { value: 1024, symbol: 'KB' }, 
        { value: 1024*1024, symbol: 'MB '},
        { value: 1024*1024*1024, symbol: 'GB' }
    ].reverse();
    for (let i=0; i<units.length; ++i) {
        const value = size / units[i].value
        if (value >= 1) {
            return `${value} ${units[i].symbol}`;
        }
    }
    return `${size/1024} MB`;
}

const INVALID_URL = 'Provided image URL is invalid';
const NON_IMAGE_RESOUCE = 'Provided URL does not contain an image';
const INVALID_ROUTE = 'The route you are looking for does not exist';
const INTERNAL_ERROR = 'Something went wrong, please try again';
const NO_IMAGE = 'Please provide product image';
const NON_IMAGE_FILE = 'Please provide an image file';
const SIZE_EXCEEDED = `Please provide an image of size <= ${printableSize(Number(process.env.MAX_FILE_SIZE))}`;

module.exports = {
    INVALID_URL,
    NON_IMAGE_RESOUCE,
    INVALID_ROUTE,
    INTERNAL_ERROR,
    NO_IMAGE,
    NON_IMAGE_FILE,
    SIZE_EXCEEDED
};