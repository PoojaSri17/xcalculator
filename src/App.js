import React, { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  // State to hold the input expression and result
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  // Function to handle button clicks
  const handleClick = (value) => {
    // Prevent invalid input when "=" is clicked directly
    if (result && value !== "C" && value !== "=") {
      setExpression(result + value); // Append to the current result if continuing the calculation
      setResult(""); // Clear the result after appending
    } else {
      setExpression((prev) => prev + value); // Append clicked button value to expression
    }
  };

  // Function to evaluate the expression


const evaluateExpression = () => {
  try {
    if (expression === "") {
      setResult("Error");
    } else if (expression.includes("/0")) {
      if (expression === "0/0") {
        setResult("NaN");
      } else {
        setResult("Infinity");
      }
    } else {
      const evalResult = evaluate(expression); // Safe evaluation using mathjs
      setResult(evalResult.toString());
    }
  } catch (error) {
    setResult("Error");
  }
};


  // Function to clear the expression and result
  const clearAll = () => {
    setExpression("");
    setResult("");
  };

  return (
    <div className="calculator">
      {/* Input field for expression */}
      <input type="text" value={expression} disabled />
      
      {/* Div for displaying result */}
      <div id="calc-result">{result}</div>

      {/* Buttons for the calculator */}
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map((button) => (
          <button
            key={button}
            onClick={() =>
              button === "="
                ? evaluateExpression()
                : button === "C"
                ? clearAll()
                : handleClick(button)
            }
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
