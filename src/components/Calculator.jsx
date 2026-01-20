import { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberClick = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperationClick = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performOperation(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performOperation = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performOperation(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        <button className="button clear" onClick={handleClear}>C</button>
        <button className="button operation" onClick={() => handleOperationClick('÷')}>÷</button>
        <button className="button operation" onClick={() => handleOperationClick('×')}>×</button>
        <button className="button operation" onClick={() => handleOperationClick('-')}>-</button>

        <button className="button" onClick={() => handleNumberClick(7)}>7</button>
        <button className="button" onClick={() => handleNumberClick(8)}>8</button>
        <button className="button" onClick={() => handleNumberClick(9)}>9</button>
        <button className="button operation" onClick={() => handleOperationClick('+')}>+</button>

        <button className="button" onClick={() => handleNumberClick(4)}>4</button>
        <button className="button" onClick={() => handleNumberClick(5)}>5</button>
        <button className="button" onClick={() => handleNumberClick(6)}>6</button>
        <button className="button equals" onClick={handleEquals}>=</button>

        <button className="button" onClick={() => handleNumberClick(1)}>1</button>
        <button className="button" onClick={() => handleNumberClick(2)}>2</button>
        <button className="button" onClick={() => handleNumberClick(3)}>3</button>

        <button className="button zero" onClick={() => handleNumberClick(0)}>0</button>
        <button className="button" onClick={handleDecimal}>.</button>
      </div>
    </div>
  );
}

export default Calculator;
