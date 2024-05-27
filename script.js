/* ----------------- Getting the html elements for the Alarm clock ---------------- */
const currentTime = document.querySelector(".currentTime");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmButton = document.querySelector(".setAlarmbtn");
const alarmList = document.querySelector(".alarmlist");

/* ----------------- Function to get Current time ---------------- */
function getCurrentTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return time;
}

/* ----------------- Function to make clock dynamic ---------------- */
function updateTime() {
  setInterval(() => {
    currentTime.innerHTML = getCurrentTime(new Date());
  }, 1000);
}

/* ----------------- Function to populate the dropdown menu options ---------------- */
function addSelectOptions(start, end, element) {
  for (let i = start; i <= end; i++) {
    const selectOption = document.createElement("option");
    selectOption.value = i < 10 ? "0" + i : i; // add 0 as prefix for value less than 10
    selectOption.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(selectOption);
  }
}

/* ----------------- Function to user input  ---------------- */
function getInput(event) {
  event.preventDefault();
  const hourValue = setHours.value;
  const minuteValue = setMinutes.value;
  const secondValue = setSeconds.value;
  const amPmValue = setAmPm.value;

  const alarmTime = `${hourValue}:${minuteValue}:${secondValue} ${amPmValue}`;
  setAlarm(alarmTime);
}

/* ----------------- Function to set Alarm  ---------------- */
function setAlarm(alarmTime) {
  const alarmlistDiv = document.createElement("div");
  alarmlistDiv.classList.add("alarm");
  alarmlistDiv.innerHTML = `
      <span>
        <h3>${alarmTime}</h3>
      </span>
      <button class="delete-alarm">
        Delete
      </button>
  `;
  alarmList.appendChild(alarmlistDiv);

  const alarm = setInterval(() => {
    if (alarmTime === currentTime.innerHTML) {
      alert("Wake up!! It's Time"); // alert once the alarm goes out
      clearInterval(alarm);
      alarmList.removeChild(alarmlistDiv);
    }
  }, 500);

  //Delete Alarm Functionality
  alarmlistDiv.querySelector(".delete-alarm").addEventListener("click", () => {
    clearInterval(alarm);
    alarmList.removeChild(alarmlistDiv);
  });
}

//Adding click event to setAlarm Button
setAlarmButton.addEventListener("click", getInput);

//Updating dropdown menu options and the current time once the page loads
window.addEventListener("DOMContentLoaded", () => {
  addSelectOptions(1, 12, setHours);
  addSelectOptions(0, 59, setMinutes);
  addSelectOptions(0, 59, setSeconds);
  currentTime.innerHTML = getCurrentTime(new Date());
  updateTime();
});
