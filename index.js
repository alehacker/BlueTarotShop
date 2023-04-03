const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');
const times = document.querySelector('#times');

function displayCalendar(year, month) {
  // Get the number of days in the month and the starting day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = new Date(year, month, 1).getDay();

  // Create a table element with headers for the days of the week
  let table = `<table><thead><tr>`;
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  weekdays.forEach(day => {
    table += `<th>${day}</th>`;
  });
  table += `</tr></thead><tbody>`;

  // Add the days of the month to the table
  let dayOfMonth = 1;
  for (let i = 0; i < 6; i++) {
    table += `<tr>`;
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < startingDay) || dayOfMonth > daysInMonth) {
        // Add an empty cell for days before the starting day or after the end of the month
        table += `<td></td>`;
      } else {
        // Add a cell with a button for each day of the month
        const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`;
        table += `<td><button data-date="${dateString}">${dayOfMonth}</button></td>`;
        dayOfMonth++;
      }
    }
    table += `</tr>`;
  }
  table += `</tbody></table>`;

  // Add the table to the calendar element and add click event listeners to the date buttons
  const calendar = document.querySelector('#calendar');
  calendar.innerHTML = table;
  const dateButtons = document.querySelectorAll('#calendar button');
  dateButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Highlight the selected date button and generate available times for the selected date
      dateButtons.forEach(button => button.classList.remove('selected'));
      button.classList.add('selected');
      const dateString = button.getAttribute('data-date');
      generateAvailableTimes(dateString);
    });
  });
}

function generateAvailableTimes(dateString) {
  // Clear the existing times and update the selected date
  times.innerHTML = '';
  dateInput.value = dateString;

  // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();

  // Define the available times for each day of the week
  const availableTimes = [
    [], // Sunday
    [], // Monday
    ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'], // Tuesday
    [], // Wednesday
    ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'], // Thursday
    [], // Friday
    ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'] // Saturday
  ];

  // Get the available times for the selected day of the week
  const timesArray = availableTimes[dayOfWeek];

  // Create buttons for each available time
  timesArray.forEach(time => {
    const button = document.createElement('button');
    button.textContent = time;
    button.addEventListener('click', () => {
      // Highlight the selected time button and update the selected time
      const selectedTimeButton = times.querySelector('.selected');
      if (selectedTimeButton) {
        selectedTimeButton.classList.remove('selected');
      }
      button.classList.add('selected');
      timeInput.value = time;
    });
    times.appendChild(button);
  });
}

// Call the displayCalendar function to initialize the calendar
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
displayCalendar(currentYear, currentMonth);