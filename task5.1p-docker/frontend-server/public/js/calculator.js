document.addEventListener('DOMContentLoaded', () => {
    const operationDisplay = document.getElementById('operation-display');
    const resultDisplay = document.getElementById('result-display');
    let currentOperation = '';
    let hasDecimal = false;

    function updateDisplay() {
        operationDisplay.textContent = currentOperation;
        resultDisplay.textContent = '';
    }

    document.querySelectorAll('.key-number, .key-dot').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.number) {
                currentOperation += button.dataset.number;
            } else if (button.dataset.dot && !hasDecimal) {
                currentOperation += '.';
                hasDecimal = true;
            }
            updateDisplay();
        });
    });

    document.querySelectorAll('.key-operation').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.operation === 'equal') {
                console.log("backend api called")
                calculateResult();
            } else {
                currentOperation += ' ' + button.textContent + ' ';
                hasDecimal = false;
            }
            updateDisplay();
        });
    });

    document.querySelectorAll('.key-equal').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.operation === 'equal') {
                console.log("backend api called")
                calculateResult();
            } else {
                currentOperation += ' ' + button.textContent + ' ';
                hasDecimal = false;
            }
            updateDisplay();
        });
    });

    document.querySelector('.key-function[data-operation="clear"]').addEventListener('click', () => {
        currentOperation = '';
        hasDecimal = false;
        updateDisplay();
        resultDisplay.textContent = '0';
    });

    document.querySelector('.key-function[data-operation="delete"]').addEventListener('click', () => {
        if (currentOperation.endsWith('.')) {
            hasDecimal = false;
        }
        currentOperation = currentOperation.slice(0, -1);
        updateDisplay();
    });

    async function calculateResult() {
        let [num1, operator, num2] = currentOperation.split(' ');
        const operationMap = {
            '+': 'add',
            '-': 'subtract',
            '*': 'multiply',
            '/': 'divide',
            '^': 'exponent',
            '√': 'sqrt',
            '%': 'modulo'
        };
        const operation = operationMap[operator];
        if (operation === 'sqrt') {
            num2 = undefined;
        }
        if (!num1 || (!num2 && operation !== 'sqrt')) {
            resultDisplay.textContent = 'Please enter the required numbers.';
            return;
        }
        var token = sessionStorage.getItem('token');
        try {
            let payload = { num1 };
            if (num2 !== undefined) {
                payload.num2 = num2;
            }
            const response = await fetch(`/api/calculate/${operation}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Failed to calculate');
            }
            const data = await response.json();
            resultDisplay.textContent = data.result;
            currentOperation = '';
            hasDecimal = false;
        } catch (error) {
            resultDisplay.textContent = 'Error';
            console.error('Calculation error:', error);
        }
    }
});
