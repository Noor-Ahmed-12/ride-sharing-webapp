// booking.js

const bookingForm = document.getElementById('booking-form');
const rideSelect = document.getElementById('ride');
const feedback = document.getElementById('feedback');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const selectedRide = rideSelect.value;

    if (!selectedRide) {
        rideSelect.classList.add('is-invalid');
        feedback.innerHTML = 'Please select a ride.';
    } else {
        // Simulated booking request
        const rideDescription = rideSelect.options[rideSelect.selectedIndex].text;
        feedback.innerHTML = `Booking confirmed for ${name} (${email}) on ${rideDescription}.`;
        rideSelect.classList.remove('is-invalid');
        bookingForm.reset();
    }
});
