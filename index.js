const cardsContainer = document.getElementById("cards");
const buttons = document.querySelectorAll(".timeframes button");

let data;

// Fetch data from JSON file
fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render("daily"); // Default to Daily view
  })
  .catch(error => console.error("Error loading data:", error));

// Add event listeners to time frame buttons
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.time);
  });
});

// Render cards based on selected time frame
function render(timeframe) {
  cardsContainer.innerHTML = ""; // Clear existing cards

  data.forEach(item => {
    const label =
      timeframe === "daily" ? "Yesterday" :
      timeframe === "weekly" ? "Last Week" :
      "Last Month";

    cardsContainer.innerHTML += `
      <div class="card-wrapper ${item.class}">
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