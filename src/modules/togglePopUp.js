const togglePopUp = () => {
  const popup = document.querySelector(".popup"),
    popupContent = document.querySelector(".popup-content"),
    popupBtn = document.querySelectorAll(".popup-btn");

  let amimationInterval;
  let persent = 0;
  popupContent.style.top = 0;

  function animation() {
    persent++;
    if (persent === 50) {
      clearInterval(amimationInterval);
    }
    popupContent.style.top = `${persent / 5}%`;
  }

  popup.addEventListener("click", (event) => {
    let target = event.target;
    if (target.classList.contains("popup-close")) {
      popup.style.display = "none";
      persent = 0;
    } else {
      target = target.closest(".popup-content");
      if (target === null) {
        popup.style.display = "none";
        persent = 0;
      }
    }
  });

  popupBtn.forEach((elem) => {
    elem.addEventListener("click", () => {
      popup.style.display = "block";
      if (screen.width > 768) {
        amimationInterval = setInterval(animation, 10);
        animation();
      }
    });
  });
};

export default togglePopUp;
