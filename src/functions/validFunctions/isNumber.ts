const isNumber = (approximateNumber: string): boolean => {
    return !isNaN(Number(approximateNumber));
}

export default isNumber;