const rsvpForm = document.getElementById('rsvpForm');
const nameInput = document.getElementById('nameInput');
const attendanceInput = document.getElementById('attendanceInput');
const guestList = document.getElementById('guestList');

let guests = JSON.parse(localStorage.getItem('guests')) || [];

function saveGuests() {
  localStorage.setItem('guests', JSON.stringify(guests));
}

function renderGuests() {
  guestList.innerHTML = '';
  if (guests.length === 0) {
    guestList.innerHTML = '<li><em>No guests confirmed yet.</em></li>';
    return;
  }
  guests.forEach((guest, index) => {
    const li = document.createElement('li');
    li.textContent = `${guest.name} — ${guest.attendance}`;
    
    // Optional: add delete button for each guest
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.title = 'Remove guest';
    delBtn.classList.add('del-btn');
    delBtn.onclick = () => {
      guests.splice(index, 1);
      saveGuests();
      renderGuests();
    };
    li.appendChild(delBtn);
    
    guestList.appendChild(li);
  });
}

rsvpForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const attendance = attendanceInput.value;

  if (!name || !attendance) {
    alert('Please enter your name and select your attendance.');
    return;
  }

  // Check for duplicate guest
  if (guests.some(g => g.name.toLowerCase() === name.toLowerCase())) {
    alert('You have already submitted your response. Thank you!');
    return;
  }

  guests.push({ name, attendance });
  saveGuests();
  renderGuests();

  rsvpForm.reset();
  attendanceInput.selectedIndex = 0;
  nameInput.focus();

  // Friendly confirmation
  alert(`Thanks, ${name}! Your response "${attendance}" has been recorded.`);
});

// Initialize on page load
renderGuests();
