// script.js

const form = document.getElementById('rsvpForm');
const nameInput = document.getElementById('nameInput');
const attendanceInput = document.getElementById('attendanceInput');
const guestList = document.getElementById('guestList');

const guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const attendance = attendanceInput.value;

  if (!name || !attendance) return;

  // Add to guests array
  guests.push({ name, attendance });

  // Update the guest list UI
  renderGuestList();

  // Reset form
  form.reset();
  attendanceInput.selectedIndex = 0;
});

function renderGuestList() {
  guestList.innerHTML = '';
  guests.forEach(guest => {
    const li = document.createElement('li');
    li.textContent = `${guest.name} — ${guest.attendance}`;
    guestList.appendChild(li);
  });
}
