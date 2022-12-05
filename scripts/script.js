const body = document.querySelector('body');
let timeOutId;

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
    if (numArray.includes(e.target.textContent)){
        if (resultValueDisplay.textContent != '0') {
            resultValueDisplay.textContent += e.target.textContent;
        } else resultValueDisplay.textContent = e.target.textContent;
    }
});

operPad.addEventListener('click', (e) => {//handle operators ['+', '-', '*', '/', '=']
    e.preventDefault();
    if (operArray.includes(e.target.textContent)){
        switch (e.target.textContent) {
            case operArray[0]:
                currentValueDisplay.textContent = resultValueDisplay.textContent + operArray[0];
                break;
            case operArray[1]:
                currentValueDisplay.textContent = resultValueDisplay.textContent + operArray[1];
                break;
            case operArray[2]:
                currentValueDisplay.textContent = resultValueDisplay.textContent + operArray[2];
                break;
            case operArray[3]:
                currentValueDisplay.textContent = resultValueDisplay.textContent + operArray[3];
                break;
            case operArray[4]:
                currentValueDisplay.textContent = resultValueDisplay.textContent + operArray[4];
                break;
            default:
                break;
        }
    }
});

controlsPad.addEventListener('click', (e) => {//handle conntrols
    let current = currentValueDisplay.textContent;
    e.preventDefault();
    if (controlsArray.includes(e.target.textContent)){
        if (controlsArray[0] === e.target.textContent) resetAll();
        if (controlsArray[1] === e.target.textContent) {
            if (resultValueDisplay.textContent != '0') resultValueDisplay.textContent = '-' + resultValueDisplay.textContent;
        }
        if (controlsArray[2] === e.target.textContent) resultValueDisplay.textContent /= 100;
    }
});

function resetAll() {
    currentValueDisplay.textContent = '';
    resultValueDisplay.textContent = '0';
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}