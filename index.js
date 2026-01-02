const cardsContainer = document.getElementById("cards");
const buttons = document.querySelectorAll(".timeframes button");

let data;

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render("weekly");
  });

buttons.forEach(btn => {

  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    render(btn.dataset.time);
    btn.classList.add("active");

  });
});

function render(timeframe) {
  cardsContainer.innerHTML = "";

  data.forEach(item => {
    const label =
      timeframe === "daily" ? "Yesterday":timeframe === "weekly" ? "Last Week" :
      "Last Month";

    cardsContainer.innerHTML += `
      <div class="card-wrapper ${item.title}">
        <div class="card">
          <div class="card-header">
            <h3>${item.title}</h3>
            <span>•••</span>
          </div>
          <h2>${item.timeframes[timeframe].current}hrs</h2>
          <p>${label} - ${item.timeframes[timeframe].previous}hrs</p>
        </div>
      </div>
    `;
  });
}
