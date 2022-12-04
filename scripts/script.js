const body = document.querySelector('body');

const calculatorDiv = document.createElement('div');
calculatorDiv.setAttribute('id', 'calculatorDiv');
body.appendChild(calculatorDiv);

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

const controlsPad = document.createElement('div');
controlsPad.setAttribute('id', 'controlsPad');
controlPanelDiv.appendChild(controlsPad);

const numPad = document.createElement('div');
numPad.setAttribute('id', 'numPad');
controlPanelDiv.appendChild(numPad);

const operPad = document.createElement('div');
operPad.setAttribute('id', 'operPad');
controlPanelDiv.appendChild(operPad);

const controlsArray = ['AC', '+/-', '%'];
const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];
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