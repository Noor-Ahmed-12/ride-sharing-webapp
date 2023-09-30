// carpooling.js

// Simulated ride data with prices
const rides = [
    { id: 1, driver: 'Ali', origin: 'Lahore', destination: 'Islamabad', seatsAvailable: 3, price: 1200 },
    { id: 2, driver: 'Sara', origin: 'Karachi', destination: 'Multan', seatsAvailable: 2, price: 900 },
    { id: 3, driver: 'Ahmed', origin: 'Islamabad', destination: 'Lahore', seatsAvailable: 4, price: 1300 },
    { id: 4, driver: 'Hina', origin: 'Faisalabad', destination: 'Rawalpindi', seatsAvailable: 1, price: 700 },
    { id: 5, driver: 'Kamran', origin: 'Karachi', destination: 'Hyderabad', seatsAvailable: 3, price: 600 },
    { id: 6, driver: 'Ayesha', origin: 'Lahore', destination: 'Sialkot', seatsAvailable: 2, price: 800 },
    { id: 7, driver: 'Naveed', origin: 'Rawalpindi', destination: 'Faisalabad', seatsAvailable: 3, price: 950 },
    { id: 8, driver: 'Zainab', origin: 'Multan', destination: 'Karachi', seatsAvailable: 4, price: 1100 },
    { id: 9, driver: 'Bilal', origin: 'Islamabad', destination: 'Peshawar', seatsAvailable: 2, price: 1400 },
    { id: 10, driver: 'Saima', origin: 'Karachi', destination: 'Quetta', seatsAvailable: 1, price: 1800 }
    // Add more ride objects with driver names and details as needed
];

const rideList = document.getElementById('ride-list');
const bookButton = document.getElementById('book-button');
const bookingForm = document.getElementById('booking-form');
const selectedRideSelect = document.getElementById('selected-ride');
const priceRangeInput = document.getElementById('price-range');
const priceOutput = document.getElementById('price-output');
const filterForm = document.getElementById('filter-form');

// Function to display rides in the UI
function displayRides(ridesToDisplay) {
    rideList.innerHTML = '';

    ridesToDisplay.forEach((ride) => {
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
    });
}

displayRides(rides);

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
        displayRides(rides);
    } else {
        alert('Booking failed. No seats available for the selected ride.');
    }
});

// Event listener for filtering rides based on price range
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const filteredRides = rides.filter((ride) => ride.price <= priceRangeInput.value);

    if (filteredRides.length === 0) {
        rideList.innerHTML = '<p>No rides match your selected price range.</p>';
    } else {
        displayRides(filteredRides);
    }
});

// Event listener to update the displayed price range value
priceRangeInput.addEventListener('input', () => {
    priceOutput.textContent = `$${priceRangeInput.value}`;

    // Ensure the ride list is updated when the user adjusts the price range
    const filteredRides = rides.filter((ride) => ride.price <= priceRangeInput.value);

    if (filteredRides.length === 0) {
        rideList.innerHTML = '<p>No rides match your selected price range.</p>';
    } else {
        displayRides(filteredRides);
    }
});
