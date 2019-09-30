// text typing
const cursor = document.querySelector(".header__subtitle-cursor");

const typingSpeed = 200;
cursorOn = 1;

setCursor = () => {
  if (cursorOn) {
    cursor.textContent = "|";
    cursorOn = 0;
  } else {
    cursor.textContent = "";
    cursorOn = 1;
  }
};

setInterval(setCursor, typingSpeed * 1.4);

const subtitleText = document.querySelector(".header__subtitle-text");
const tempSubtitleText = subtitleText.textContent;
subtitleText.textContent = "";

let letter = 0;
addLetter = () => {
  subtitleText.textContent += tempSubtitleText.charAt(letter);
  letter++;
};
typing = () => {
  setInterval(addLetter, typingSpeed);
};

setTimeout(() => {
  typing();
}, 2000);

//buttons
const btn = document.querySelector(".button--header");

btn.addEventListener("click", () => {
  btn.classList.toggle("button--active");
  console.log(`As for now - I'm doing nothing.`);
});

//nav items
const options = document.querySelectorAll(".navigation__list-item");
options.forEach(opt =>
  opt.addEventListener("click", () => {
    options.forEach(opt => {
      opt.classList.remove("navigation__list-item--active");
    });
    opt.classList.toggle("navigation__list-item--active");
  })
);

//articles

const section = document.querySelector("section");

const appendArticles = data => {
  data.forEach(element => {
    let article = document.createElement("article");
    article.classList.add("article");
    article.setAttribute = element.id;
    article.innerHTML = `<h1 class='article__title'>${element.name}</h1><blockquote class='article__author'>${element.author}</blockquote><p class='article__text'>${element.content}</p>`;
    section.appendChild(article);
  });
};

//form search
const search = document.querySelector(".form__input");

fetch("articles.json")
  .then(res => res.json())
  .then(res => {
    appendArticles(res);
    search.addEventListener("input", () => {
      section.innerHTML = "";
      let artList = res.filter(data => data.name.includes(search.value));
      appendArticles(artList);
    });
  })
  .catch(err => console.log(err));
