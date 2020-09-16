const slider = () => {
  const slider = document.querySelector(".portfolio-content"),
    slide = document.querySelectorAll(".portfolio-item"),
    dots = document.querySelector(".portfolio-dots");

  let currentSlide = 0,
    interval;

  for (let i = 0; i < slide.length; i++) {
    let newElem = document.createElement("li");
    newElem.classList.add("dot");
    if (i === 0) {
      newElem.classList.add("dot-active");
    }
    dots.append(newElem);
  }
  const dot = document.querySelectorAll(".dot");

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const AutoPlaySlide = () => {
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  };
  const StartPlaySlide = (time = 3000) => {
    interval = setInterval(AutoPlaySlide, time);
  };

  const StopPlaySlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", (event) => {
    event.preventDefault();

    let target = event.target;

    if (!target.matches(".dot, .portfolio-btn")) {
      return;
    }

    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");

    if (target.matches("#arrow-left")) {
      currentSlide--;
    } else if (target.matches("#arrow-right")) {
      currentSlide++;
    } else if (target.matches(".dot")) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  });
  slider.addEventListener("mouseover", (event) => {
    if (event.target.matches(".dot, .portfolio-btn")) {
      StopPlaySlide();
    }
  });
  slider.addEventListener("mouseout", (event) => {
    if (event.target.matches(".dot, .portfolio-btn")) {
      StartPlaySlide();
    }
  });
  StartPlaySlide();
};

export default slider;