const grid = document.querySelector(".game-grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const organics = [
  {
    name: "acido-carboxilico",
    id: 1,
  },
  {
    name: "alcool",
    id: 2,
  },
  {
    name: "aldeido",
    id: 3,
  },
  {
    name: "amida",
    id: 4,
  },
  {
    name: "amina",
    id: 5,
  },
  {
    name: "cetona",
    id: 6,
  },
  {
    name: "ester",
    id: 7,
  },
  {
    name: "eter",
    id: 8,
  },
  {
    name: "fenol",
    id: 9,
  },
  {
    name: "nitrila",
    id: 10,
  },
  {
    name: "nitrocomposto-alifatico",
    id: 11,
  },
  {
    name: "nitrocomposto-aromatico",
    id: 12,
  },
  {
    name: "nome-acido-carboxilico",
    id: 1,
  },
  {
    name: "nome-alcool",
    id: 2,
  },
  {
    name: "nome-aldeido",
    id: 3,
  },
  {
    name: "nome-amida",
    id: 4,
  },
  {
    name: "nome-amina",
    id: 5,
  },
  {
    name: "nome-cetona",
    id: 6,
  },
  {
    name: "nome-ester",
    id: 7,
  },
  {
    name: "nome-eter",
    id: 8,
  },
  {
    name: "nome-fenol",
    id: 9,
  },
  {
    name: "nome-nitrila",
    id: 10,
  },
  {
    name: "nome-nitrocomposto-alifatico",
    id: 11,
  },
  {
    name: "nome-nitrocomposto-aromatico",
    id: 12,
  },
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const playAgain = () => {
  window.location = "/pages/index.html";
};

const createBtnPlayAgain = () => {
  const btnPlayAgain = createElement("button", "play-again");
  btnPlayAgain.innerHTML = "Jogar de Novo";
  btnPlayAgain.addEventListener("click", playAgain);

  const main = document.querySelector("main");
  main.appendChild(btnPlayAgain);
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 24) {
    clearInterval(this.loop);
    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos.`
    );
    createBtnPlayAgain();
  }
};

const checkCards = () => {
  const firstOrganic = firstCard.getAttribute("data-id");
  const secondOrganic = secondCard.getAttribute("data-id");

  if (firstOrganic === secondOrganic) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  console.log(target.parentNode);

  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (organic) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../assets/imgs/${organic.name}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-id", organic.id);

  return card;
};

const loadGame = () => {
  const shuffledOrganics = organics.sort(() => Math.random() - 0.5);

  shuffledOrganics.forEach((organic) => {
    const card = createCard(organic);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTimer = +timer.innerHTML;
    timer.innerHTML = currentTimer + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
