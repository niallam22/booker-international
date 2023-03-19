const datepicker = document.querySelector('#datepicker input');
const timeSlots = document.querySelectorAll('.timeSlot');

// set default meeting bounds
let earliestTime=0;
let latestTime=23;
let dayRange=1;

// Create an AudioContext to handle browser gesture errors
//!!!!AudioContext is not supported on all browsers, so this may cause an error on some browsers. add a check to see if AudioContext is supported before trying to use it.
let context;
window.onload = function(){
  context = new AudioContext();
}
// !!!!!updateOptions() is called when the datepicker value changes, but datepicker.value is used to create a new Date object without checking if it is valid. If datepicker.value is an empty string or an invalid date format, this will cause an error. add a check to ensure that datepicker .value is a valid date before creating a new Date object with it. or a try catch block to catch the error
const updateOptions = () => {
  // Generate array of dates for the selected date plus up to 7 more days
  const selectedDate = new Date(`${datepicker.value} UTC`);
  const days = [];
  for (let i = 0; i < dayRange; i++) {
    const date = new Date(selectedDate.getTime() + i * 24 * 60 * 60 * 1000);
    days.push(date);
  }

  // Generate array of time slots based on earliest and latest times
  const hours = [];
  const startHour = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), earliestTime);
  const endHour = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), latestTime);
  for (let i = 0; i <= 23; i++) {
    const time = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), i);
    if (time >= startHour && time <= endHour) {
      hours.push(time);
    }
  }

  // Clear the current options for the schedule
  const schedule = document.querySelector('#schedule');
  schedule.innerHTML = '';

  //create table header 
  const tableHeadRow = document.createElement('tr')
  days.forEach(day => {
    const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = day.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const dayId = dayOfWeek.toLowerCase();

    const dayOption = document.createElement('th');
    dayOption.classList.add('day');
    dayOption.setAttribute('id', dayId);
    dayOption.setAttribute('scope', 'col');
    dayOption.textContent = `${dayOfWeek} ${dayOfMonth}`;
    tableHeadRow.appendChild(dayOption)
  })

  const tableBody = document.createElement('tbody')
  hours.forEach((hour, index)=>{ //create table row by row (1 row for each hour)
    const hourRow = document.createElement('tr')

    //populate each column with the input info (ie moving mon-fri add the input field for 9am for each day and then move to the next row and then do the same for 10am etc.).
    days.forEach(day => {
      const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
      const dayOfMonth = day.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      const dayId = dayOfWeek.toLowerCase();

      //create input field
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'facilitatorTime');
      checkbox.setAttribute('class', 'timeSlot');
      checkbox.setAttribute('value', `${dayOfWeek}, ${hour.toISOString()}`)
      //append input field to a td element to create a cell in the tabel
      const hourOption = document.createElement('td')
      hourOption.appendChild(checkbox)

      //append label to input field so user can see the time
      const label = document.createElement('label');
      label.textContent = hour.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      hourOption.appendChild(label);

      hourRow.appendChild(hourOption)
    })
    tableBody.appendChild(hourRow)
  })
  const tableHead = document.createElement('thead')
  tableHead.appendChild(tableHeadRow)
  const table = document.createElement('table')
  table.classList.add('table')
  table.appendChild(tableHead)
  table.appendChild(tableBody)
  schedule.appendChild(table)
}

document.getElementById('earliestTime').addEventListener('change', () => {
  earliestTime = Number(document.getElementById('earliestTime').value);
  updateOptions();
});

document.getElementById('latestTime').addEventListener('change', () => {
  latestTime = Number(document.getElementById('latestTime').value);
  updateOptions();
});

document.getElementById('dayRange').addEventListener('change', () => {
  dayRange = Number(document.getElementById('dayRange').value);
  updateOptions();
});

// Date picker and event listener to the datepicker
$(document).ready(function() {
  $('#datepicker').datepicker()
      .on('changeDate', function(e) {
        updateOptions();
      });
});
