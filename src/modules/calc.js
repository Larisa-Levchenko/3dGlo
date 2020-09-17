const calc = (price = 100) => {
  const calcBlock = document.querySelector(".calc-block");
  const inputCalc = calcBlock.querySelectorAll("input");

  const calcType = calcBlock.querySelector(".calc-type");
  const calcSquare = calcBlock.querySelector(".calc-square");
  const calcCount = calcBlock.querySelector(".calc-count");
  const calcDay = calcBlock.querySelector(".calc-day");
  const total = calcBlock.querySelector("#total");

  let animation = 0;
  let sum;

  inputCalc.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/\D/g, "");
    });
  });

  const animationSum = () => {
    if (total.textContent < sum) {
      if (+total.textContent + 100 > sum) {
        total.textContent = sum;
      } else {
        total.textContent = +total.textContent + 100;
      }
      animation = window.requestAnimationFrame(animationSum);
    }
  };

  const countSum = () => {
    total.textContent = 0;
    let typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = calcSquare.value,
      countValue = 1,
      dayValue = 1;
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }
    if (!!typeValue && !!squareValue) {
      sum = parseInt(price * typeValue * squareValue * countValue * dayValue);
      animationSum();
    }
  };

  calcBlock.addEventListener("change", () => {   
    if (event.target.matches("select") || event.target.matches("input")) {      
      countSum();
    }
  });
};

export default calc;