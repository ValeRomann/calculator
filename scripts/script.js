const body = document.querySelector('body');

const calculatorDiv = document.createElement('div');
calculatorDiv.setAttribute('id', 'calculatorDiv');
body.appendChild(calculatorDiv);

const h1 = document.createElement('h1');
h1.textContent = 'Calculator';
calculatorDiv.appendChild(h1);

const displayDiv = document.createElement('div');
displayDiv.setAttribute('id', 'displayDiv');
calculatorDiv.appendChild(displayDiv);

const currentValueDisplay = document.createElement('div');
currentValueDisplay.setAttribute('id', 'currentValue');
displayDiv.appendChild(currentValueDisplay);

const resultValueDisplay = document.createElement('div');
resultValueDisplay.setAttribute('id', 'resultValue');
displayDiv.appendChild(resultValueDisplay);

const controlPanelDiv = document.createElement('div');
controlPanelDiv.setAttribute('id', 'controlPanelDiv');
calculatorDiv.appendChild(controlPanelDiv);

const operPad = document.createElement('div');
operPad.setAttribute('id', 'operPad');
controlPanelDiv.appendChild(operPad);

const controlsPad = document.createElement('div');
controlsPad.setAttribute('id', 'controlsPad');
controlPanelDiv.appendChild(controlsPad);

const numPad = document.createElement('div');
numPad.setAttribute('id', 'numPad');
controlPanelDiv.appendChild(numPad);

const controlsArray = ['AC', '±', '%'];
const numArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operArray = ['+', '-', '*', '/', '='];

addButtonsToPad(controlsArray, controlsPad, 'controlsBtn');
addButtonsToPad(numArray, numPad, 'numBtn');
addButtonsToPad(operArray, operPad, 'operBtn');

const resetBtn = controlsPad.querySelector('button');
let currentSum = null;
let currentNum = '0';
let reservedNum = currentNum;
let wasOperator = false; //last input was operator?
let lastOperator = '';
let backspace = false;

function addButtonsToPad(buttonsArr, pad, className) {
    buttonsArr.forEach(btnContent => {
        let btn = document.createElement('button');
        btn.setAttribute('class', className);
        btn.textContent = btnContent;
        pad.appendChild(btn);
    });
}

numPad.addEventListener('click', (e) => {//handle numbers ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
    e.preventDefault();
    resetBtn.textContent = 'C';
    let numBtnContent = e.target.textContent;
    if (numBtnContent === '.') {
        if (currentNum.includes(numBtnContent)) return;
        if (currentNum.length >= 13) return;
        currentNum += numBtnContent;
        resultValueDisplay.textContent = currentNum;
    } else {
        if (numArray.includes(numBtnContent)){
            if (currentNum != '0') {
                if (wasOperator) {
                    currentNum = '';
                    if (currentNum.length >= 13) return;
                    resultValueDisplay.textContent = currentNum;
                    currentNum += numBtnContent;
                    resultValueDisplay.textContent = currentNum;
                } else {
                    if (currentNum.length >= 13) return;
                    currentNum += numBtnContent;
                    resultValueDisplay.textContent = currentNum;
                }
            } else {
                currentNum = numBtnContent;
            }
        }
    }
    resultValueDisplay.textContent = currentNum;
    wasOperator = false;
});

operPad.addEventListener('click', (e) => {//handle operators ['+', '-', '*', '/', '=']
    e.preventDefault();
    reservedNum = currentNum;
    if (currentNum[currentNum.length - 1] === '.') return;
    let operator = e.target.textContent;
    let currentDisplayNum = resultValueDisplay.textContent;    
    if (operArray.includes(operator)){
        if (operator !== '=') {
            if (wasOperator) {
                currentValueDisplay.textContent = currentSum + operator;
                lastOperator = operator;
            } else {
                if (currentSum) {
                    currentSum = calculate(currentSum, currentDisplayNum, lastOperator);
                    currentSum = roundSum(currentSum);
                } else {
                    currentSum = currentDisplayNum;
                }
                lastOperator = operator;
                currentValueDisplay.textContent = currentSum + operator;
            }
        } else {
            resetBtn.textContent = 'AC';
            if (currentSum !== null) {
                currentValueDisplay.textContent = currentSum + lastOperator + currentNum + operator;
                currentSum = calculate(currentSum, currentNum, lastOperator);
                currentSum = roundSum(currentSum);
                if (isNaN(currentSum)) {
                    resetAll();
                    resultValueDisplay.textContent = 'error';
                    return;
                }
            } else {
                currentValueDisplay.textContent = currentNum + operator;
                resultValueDisplay.textContent = currentNum;
                return;
            }
        }
    }
    resultValueDisplay.textContent = currentSum;
    wasOperator = true;
});

controlsPad.addEventListener('click', (e) => {//handle conntrols
    e.preventDefault();
    if (controlsArray.includes(e.target.textContent)){
        if (controlsArray[0] === e.target.textContent) resetAll();
        if (controlsArray[1] === e.target.textContent) {
            if (resultValueDisplay.textContent != '0') {
                if (resultValueDisplay.textContent[0] === '-') {
                    currentNum = resultValueDisplay.textContent.slice(1);
                    resultValueDisplay.textContent = currentNum;
                } else {
                    currentNum = '-' + resultValueDisplay.textContent;
                    resultValueDisplay.textContent = currentNum;
                }
            }
        }
        if (currentNum[currentNum.length - 1] === '.') return;
        if (controlsArray[2] === e.target.textContent) resultValueDisplay.textContent = roundSum(resultValueDisplay.textContent / 100);
    } else if (e.target.textContent === 'C') {
        if (currentSum) {
            currentNum = '';
            resultValueDisplay.textContent = currentNum;
            e.target.textContent = 'AC';
        } else {
            e.target.textContent === 'AC';
            resetAll();
        }
    }
});

function resetAll() {
    currentValueDisplay.textContent = '';
    resultValueDisplay.textContent = '0';
    currentSum = null;
    currentNum = '0';
    wasOperator = false;
    lastOperator = '';
}

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return 'error';
    return a / b;
}

function calculate(a, b, operator) {//operators ['+', '-', '*', '/', '=']
    switch (operator) {
        case operArray[0]:
            return add(a, b);
        case operArray[1]:
            return subtract(a, b);
        case operArray[2]:
            return multiply(a, b);
        case operArray[3]:
            return divide(a, b);
        default:
            break;
    }
}

function roundSum(sum) {
    sum = +sum;
    let beforeDotNumLength = sum.toString().indexOf('.');
    if (beforeDotNumLength > -1) beforeDotNumLength -= 1;
    if (sum.toString().length > 13) return +sum.toFixed(11 - beforeDotNumLength);
    else return sum;
}