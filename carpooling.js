// carpooling.js

// Simulated ride data with prices
const rides = [
    { id: 1, driver: 'Alice', origin: 'City A', destination: 'City B', seatsAvailable: 3, price: 20 },
    { id: 2, driver: 'Bob', origin: 'City C', destination: 'City D', seatsAvailable: 1, price: 15 },
    { id: 3, driver: 'Carol', origin: 'City X', destination: 'City Y', seatsAvailable: 5, price: 30 },
    // Add more ride objects as needed
];

const rideList = document.getElementById('ride-list');
const bookButton = document.getElementById('book-button');
const bookingForm = document.getElementById('booking-form');
const selectedRideSelect = document.getElementById('selected-ride');
const priceRangeInput = document.getElementById('price-range');
const priceOutput = document.getElementById('price-output');
const filterForm = document.getElementById('filter-form');

// Function to display rides in the UI
function displayRides() {
    rideList.innerHTML = '';
    const priceRange = priceRangeInput.value;

    rides.forEach((ride) => {
        if (ride.price <= priceRange) {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `
                Ride ${ride.id} - ${ride.origin} to ${ride.destination} 
                <span class="badge bg-primary rounded-pill">Price: $${ride.price}</span>
                <span class="badge bg-success rounded-pill">${ride.seatsAvailable} seats available</span>
            `;
            rideList.appendChild(li);

            // Populate the booking form's ride options dynamically
            const option = document.createElement('option');
            option.value = ride.id;
            option.textContent = `Ride ${ride.id} - $${ride.price} (${ride.origin} to ${ride.destination})`;
            selectedRideSelect.appendChild(option);
        }
    });
}

displayRides();

// Event listener for booking a ride
bookButton.addEventListener('click', () => {
    bookingForm.style.display = 'block';
});

// Event listener for submitting the booking form
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const selectedRideId = selectedRideSelect.value;

    if (!name || !email || !selectedRideId) {
        alert('Please fill out all fields.');
        return;
    }

    // Find the selected ride
    const selectedRide = rides.find((ride) => ride.id === parseInt(selectedRideId));

    if (selectedRide && selectedRide.seatsAvailable > 0) {
        // Simulated booking confirmation
        selectedRide.seatsAvailable--;
        alert(`Booking confirmed for ${name} (${email}) on Ride ${selectedRide.id}.`);
        bookingForm.style.display = 'none';
        // Update the ride list with the new seat availability
        displayRides();
    } else {
        alert('Booking failed. No seats available for the selected ride.');
    }
});

// Event listener for filtering rides based on price range
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displayRides();
});

// Event listener to update the displayed price range value
priceRangeInput.addEventListener('input', () => {
    priceOutput.textContent = `$${priceRangeInput.value}`;
});
