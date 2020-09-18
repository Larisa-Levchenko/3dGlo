const sendForm = () => {
  const errorMessage = "Что-то пошло не так...",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро свяжемся с Вами!";

  const forms = document.querySelectorAll("form"),
    placeholderName = document.querySelectorAll('[placeholder="Ваше имя"]'),
    placeholderText = document.querySelector('[placeholder="Ваше сообщение"]'),
    placeholderPhone = document.querySelectorAll(
      '[placeholder="Номер телефона"]'
    );

  placeholderName.forEach((item) => {
    item.autocomplete = "off";
  });

  placeholderPhone.forEach((item) => {
    item.autocomplete = "off";
    item.pattern = "[+][0-9]{11}";
  });

  placeholderName.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[^^А-Яа-я ]/i, "");
    });
  });

  placeholderText.addEventListener("input", () => {
    placeholderText.value = placeholderText.value.replace(/[^^А-Яа-я\W ]/i, "");
  });

  placeholderPhone.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[^0-9+]/i, "");
    });
  });

  const postDate = (date) => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    });
  };

  const emptyStr = () => {
    let formMessage = document.querySelector(".create-message");
    formMessage.remove();
  };

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const createMessage = document.createElement("div");
      createMessage.textContent = loadMessage;
      createMessage.classList.add("create-message");
      createMessage.style.cssText = "font-size: 2rem";
      createMessage.style.cssText = "color: #fff";
      form.appendChild(createMessage);

      const formData = new FormData(form);

      for (let i = 0; i < form.length - 1; i++) {
        form[i].value = "";
      }

      let body = {};
      formData.forEach((value, key) => {
        body[key] = value;
      });
      postDate(body)
        .then(() => (createMessage.textContent = successMessage))
        .catch(() => (createMessage.textContent = errorMessage));

      setTimeout(emptyStr, 8000);
    });
  });
};

export default sendForm;