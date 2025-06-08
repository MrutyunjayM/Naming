const form = document.getElementById('rsvpForm');
const nameInput = document.getElementById('nameInput');
const attendanceInput = document.getElementById('attendanceInput');
const guestList = document.getElementById('guestList');

const guests = [];

// Load saved guests on page load
window.onload = () => {
  const savedGuests = localStorage.getItem('guests');
  if (savedGuests) {
    guests.push(...JSON.parse(savedGuests));
    renderGuestList();
  }
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const attendance = attendanceInput.value;

  if (!name || !attendance) return;

  guests.push({ name, attendance });

  // Save to localStorage
  localStorage.setItem('guests', JSON.stringify(guests));

  renderGuestList();

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
