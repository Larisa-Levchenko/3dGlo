const toggleMenu = () => {
  const menu = document.querySelector("menu");

  let top = 0,
    blockTop,
    animation;

  const hendlerMenu = () => {
    menu.classList.toggle("active-menu");
  };

  const getAnimation = () => {
    if (top < blockTop) {
      if (top + 50 > blockTop) {
        top = blockTop;
      } else {
        top = top + 50;
        animation = window.requestAnimationFrame(getAnimation);
      }
    }
    window.scrollTo(0, top);
  };

  const getScroll = (event) => {
    event.preventDefault();
    const target = event.target.closest("a");
    const blockID = target.getAttribute("href").substr(1);
    const block = document.getElementById(blockID);
    top = 0;
    blockTop = block.getBoundingClientRect().top;
    getAnimation();
  };

  document.body.addEventListener("click", (event) => {
    let target = event.target;
    if (target.closest(".menu") !== null) {
      hendlerMenu();
    } else {
      if (
        target.closest("menu") === null &&
        menu.classList.contains("active-menu")
      ) {
        hendlerMenu();
      }
    }
    if (
      target.closest("menu") !== null &&
      !target.classList.contains("active-menu")
    ) {
      if (
        !target.classList.contains("close-btn") &&
        target.closest("a") !== null
      ) {
        getScroll(event);
      }
      hendlerMenu();
    }
    if (target.closest("main") !== null && target.closest("a")) {
      getScroll(event);
    }
  });
};

export default toggleMenu;