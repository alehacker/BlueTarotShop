// Define the available times for each day of the week
const availableTimes = {
  0: ['10:00', '11:00', '12:00', '13:00', '14:00'],
  1: ['10:00', '11:00', '12:00', '13:00', '14:00'],
  2: ['10:00', '11:00', '12:00', '13:00', '14:00'],
  3: ['11:00', '12:00', '13:00', '14:00', '15:00'],
  4: ['11:00', '12:00', '13:00', '14:00', '15:00'],
  5: ['13:00', '14:00', '15:00', '16:00', '17:00'],
  6: ['13:00', '14:00', '15:00', '16:00', '17:00']
};

// Define the calendar logic and generate available times when a date is selected
function displayCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfWeek = lastDay.getDay();
  const daysBefore = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const daysAfter = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;
  const totalDays = daysInMonth + daysBefore + daysAfter;
  const weeks = Math.ceil(totalDays / 7);
  const calendar = document.querySelector('.calendar');
  calendar.innerHTML = '';
  const header = document.createElement('tr');
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach(weekday => {
    const th = document.createElement('th');
    th.textContent = weekday;
    header.appendChild(th);
  });
  calendar.appendChild(header);
  let date = 1 - daysBefore;
  for (let i = 0; i < weeks; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const td = document.createElement('td');
      td.classList.add('day');
      if (date > 0 && date <= daysInMonth) {
        td.textContent = date;
        const yearString = year.toString().padStart(4, '0');
        const monthString = (month + 1).toString().padStart(2, '0');
        const dateString = date.toString().padStart(2, '0');
        const isoDate = `${yearString}-${monthString}-${dateString}`;
        td.dataset.date = isoDate;
        if (j === 0 || j === 6) {
          td.classList.add('weekend');
        }
        date++;
      } else {
        td.classList.add('empty');
      }
      row.appendChild(td);
    }
    calendar.appendChild(row);
  }
}

function generateAvailableTimes(dateString) {
  const dayOfWeek = new Date(dateString).getDay();
  const timesArray = availableTimes[dayOfWeek];
  const times = document.querySelector('#times');
  times.innerHTML = '';
  timesArray.forEach(time => {
    const button = document.createElement('button');
    button.textContent = time;
    button.dataset.time =
    button.dataset.date = dateString;
    button.dataset.time = time;
    button.classList.add('available');
    times.appendChild(button);
  });
}

// Define a function to handle the click event on a day element
function handleDayClick(event) {
  const clickedDate = event.target.dataset.date;
  generateAvailableTimes(clickedDate);
}

// Define a function to handle the click event on a time element
function handleTimeClick(event) {
  const clickedButton = event.target;
  const selectedDateTime = clickedButton.dataset.date + ' ' + clickedButton.dataset.time;
  const selectedDate = new Date(selectedDateTime);
  const now = new Date();
  if (selectedDate < now) {
    alert('Please select a future date and time.');
    return;
  }
  clickedButton.classList.remove('available');
  clickedButton.classList.add('selected');
  clickedButton.disabled = true;
  alert(`You have booked a reading for ${selectedDateTime}.`);
}

// Add event listeners to the calendar and time elements
const calendar = document.querySelector('.calendar');
calendar.addEventListener('click', handleDayClick);

const times = document.querySelector('#times');
times.addEventListener('click', handleTimeClick);
times.addEventListener('click', handleTimeClick);

// Display the current month on load
const now = new Date();
displayCalendar(now.getFullYear(), now.getMonth());

