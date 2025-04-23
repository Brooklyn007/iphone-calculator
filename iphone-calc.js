window.onload = function () {
    const buttonvalues = [
      "AC", "+/-", "%", "/",
      "7", "8", "9", "*",
      "4", "5", "6", "-",
      "1", "2", "3", "+",
      "0", ".", "="
    ];
  
    const rightsymbols = ["/", "*", "-", "+", "="];
    const topsymbols = ["AC", "+/-", "%"];
  
    const display = document.getElementById("display");
    let A = 0;
    let operator = null;
    let B = null;
  
    function clearAll() {
      A = 0;
      operator = null;
      B = null;
    }
  
    for (let i = 0; i < buttonvalues.length; i++) {
      let value = buttonvalues[i];
      let button = document.createElement("button");
      button.innerText = value;
  
      // Assign classes based on type
      if (rightsymbols.includes(value)) {
        button.classList.add("orange");
      } else if (topsymbols.includes(value)) {
        button.classList.add("gray");
      }
  
      if (value === "0") {
        button.classList.add("zero");
      }
  
      button.addEventListener("click", function () {
        // Operator & equals logic
        if (rightsymbols.includes(value)) {
          if (value === "=") {
            if (A != null && display.value !== "") {
              B = display.value;
              let numA = Number(A);
              let numB = Number(B);
  
              if (operator === "/") {
                display.value = numB !== 0 ? numA / numB : "Error";
              } else if (operator === "*") {
                display.value = numA * numB;
              } else if (operator === "-") {
                display.value = numA - numB;
              } else if (operator === "+") {
                display.value = numA + numB;
              }
              clearAll();
            }
          } else {
            operator = value;
            A = display.value;
            display.value = "";
          }
        }
        // Top function buttons
        else if (topsymbols.includes(value)) {
          if (value === "AC") {
            clearAll();
            display.value = "";
          } else if (value === "+/-") {
            if (display.value !== "" && display.value !== "0") {
              if (display.value[0] === "-") {
                display.value = display.value.slice(1);
              } else {
                display.value = "-" + display.value;
              }
            }
          } else if (value === "%") {
            if (display.value !== "") {
              display.value = Number(display.value) / 100;
            }
          }
        }
        // Number & decimal input
        else {
          if (value === ".") {
            if (display.value === "") {
              display.value = "0.";
            } else if (!display.value.includes(".")) {
              display.value += ".";
            }
          } else if (display.value === "0") {
            display.value = value;
          } else {
            display.value += value;
          }
        }
      });
  
      document.getElementById("buttons").appendChild(button);
    }
  };
  