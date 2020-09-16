const command = () => {
  const command = document.querySelector(".command");
  let tmpImg;
  command.addEventListener("mouseover", (event) => {
    if (event.target.closest(".row")) {
      tmpImg = event.target.src;
      event.target.src = event.target.dataset.img;
    }
  });

  command.addEventListener("mouseout", (event) => {
    if (event.target.closest(".row")) {
      event.target.dataset.img = event.target.src;
      event.target.src = tmpImg;
    }
  });
};

export default command;