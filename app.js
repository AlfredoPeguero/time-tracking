const card = document.querySelector("#card");

// BUTTON
const btnDaily = document.querySelector("#btnDaily");
const btnWeekly = document.querySelector("#btnWeekly");
const btnMonthly = document.querySelector("#btnMonthly");

btnDaily.addEventListener("click", () => {
  btnDaily.classList.add("active");
  btnWeekly.classList.remove("active");
  btnMonthly.classList.remove("active");
  getData("daily");
  updateCard();
});
btnWeekly.addEventListener("click", () => {
  btnWeekly.classList.add("active");
  btnDaily.classList.remove("active");
  btnMonthly.classList.remove("active");
  getData("weekly");
  updateCard();
});
btnMonthly.addEventListener("click", () => {
  btnMonthly.classList.add("active");
  btnDaily.classList.remove("active");
  btnWeekly.classList.remove("active");
  getData("monthly");
  updateCard();
});

const createCard = (data, times) => {
  const { current, previous } = times;
  const cardContent = document.createElement(`article`);
  cardContent.classList.add("card");
  cardContent.classList.add(`${data}`);
  cardContent.innerHTML = `
    <header class="header">
      <img src="/images/icon-${data.toLowerCase()}.svg" alt="" />
    </header>
    <div class="card__info">
      <div class="card__info_top">
        <h4 class="card__title">${data}</h4>
        <h5 class="card__dots">. . .</h5>
      </div>
      <div class="card__info_bottom">
        <h4 class="card__hours">${current}hrs</h4>
        <h5 class="card__previous">Last Week - ${previous}hrs</h5>
      </div>     
    </div>
  `;
  

  card.appendChild(cardContent);
};

const updateCard = () => {
  card.innerHTML = "";
};

async function getData(timeframe = "weekly") {
  await fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        const { title, timeframes } = element;
        createCard(title, timeframes[timeframe]);
      });
    })
    .catch((err) => console.error(err));
}
document.addEventListener("DOMContentLoaded", getData())

