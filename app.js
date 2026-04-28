let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

function goToStep2() {
  if (!document.getElementById("truth").value) return alert("Моля, въведете емоционална истина.");
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function startTimer() {
  let timeLeft = 45; // Спрямо твоята таблица за Реактивация
  document.getElementById("timerBtn").disabled = true;
  let interval = setInterval(() => {
    timeLeft--;
    document.getElementById("timerDisplay").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      goToStep3();
    }
  }, 1000);
}

function goToStep3() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
  document.getElementById("oldTruthDisplay").innerText = "Стара истина: " + document.getElementById("truth").value;
}

function saveSession() {
  let truth = document.getElementById("truth").value;
  let newExp = document.getElementById("newExperience").value;

  sessions.push({ truth, newExp, date: new Date().toLocaleString() });
  localStorage.setItem("sessions", JSON.stringify(sessions));
  
  render();
  alert("Интеграция: Започна 6-часовият прозорец за презаписване!");
  location.reload(); 
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";
  sessions.forEach(s => {
    list.innerHTML += `
      <div class="card">
        <p><strong>Истината на амигдалата:</strong> ${s.truth}</p>
        <p><strong>Нов опит:</strong> ${s.newExp}</p>
        <small>${s.date}</small>
      </div>
    `;
  });
}
render();