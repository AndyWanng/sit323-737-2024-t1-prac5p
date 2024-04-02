const operations = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => {
        if (num2 === 0) throw new Error("Cannot divide by zero.");
        return num1 / num2;
    },
    exponent: (num1, num2) => Math.pow(num1, num2),
    sqrt: (num1) => {
        if (num1 < 0) throw new Error("Cannot find the square root of a negative number.");
        return Math.sqrt(num1);
    },
    modulo: (num1, num2) => num1 % num2
};

const calculate = (operation, num1, num2) => {
    if (!(operation in operations)) {
        throw new Error(`Unsupported operation: ${operation}`);
    }

    return operations[operation](num1, num2);
};

module.exports = {
    calculate
};
