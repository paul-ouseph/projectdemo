// Redirect to login if not logged in
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html'; // Redirect to the login page
    }
});

//theme.......................................................................................... 
function switchTheme(theme) {
    document.getElementById('themeStylesheet').href = theme;
    }

// Function to toggle the dropdown visibility for theme buttons
function toggleDropdown() {
    var dropdown = document.getElementById('theme-buttons');
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Function to switch theme.........................................................................
function switchTheme(theme) {
    document.getElementById('themeStylesheet').href = theme;
}


document.addEventListener('DOMContentLoaded', function() {
    fetchDeviceStatus(); // Run this function only after the DOM is loaded
});

function fetchDeviceStatus() {
    // Dummy data simulating the status of the applications
    const deviceStatus = {
        application1: Math.random() > 0.5 ? "ON" : "OFF", // Randomly "ON" or "OFF"
        application2: Math.random() > 0.5 ? "ON" : "OFF",
        application3: Math.random() > 0.5 ? "ON" : "OFF"
    };

    // Update the status for each application
    document.querySelector("#application1-status").textContent = deviceStatus.application1;
    document.querySelector("#application2-status").textContent = deviceStatus.application2;
    document.querySelector("#application3-status").textContent = deviceStatus.application3;

    // Dynamically apply the appropriate class based on ON/OFF status
    updateStatusClass("#application1-status", deviceStatus.application1);
    updateStatusClass("#application2-status", deviceStatus.application2);
    updateStatusClass("#application3-status", deviceStatus.application3);
}

// Function to add the right class (status-on or status-off)
function updateStatusClass(selector, status) {
    const element = document.querySelector(selector);
    if (status === "ON") {
        element.classList.remove("status-off");
        element.classList.add("status-on");
    } else {
        element.classList.remove("status-on");
        element.classList.add("status-off");
    }
}

        



// This function updates the calendar when the month or year changes.......................................
function updateCalendar() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the selected month/year

    const calendar = document.getElementById('calendar');
    
    // Clear previous dates and empty slots
    const dateElements = document.querySelectorAll('.date, .empty');
    dateElements.forEach(el => el.remove());

    // Calculate the first day of the month (Sunday = 0, Monday = 1, etc.)
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    // Adjust so that Monday is the start of the week (if Sunday, adjust to 6, otherwise subtract 1)
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Add empty divs to align the first day of the month
    for (let i = 0; i < startDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        calendar.appendChild(emptyDiv);
    }

    // Generate date elements for the days in the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        dateDiv.innerText = day;
        dateDiv.onclick = function() { handleDateClick(day, month, year, daysInMonth); }; // Pass daysInMonth to handleDateClick
        calendar.appendChild(dateDiv);
    }

    // Placeholder total units for the month, replace with actual database query later
    const totalUnitsForMonth = Math.floor(Math.random() * 1000); // Random total units for month

    // Update the usage boxes
    document.getElementById('units-hour').innerText = "0";    // Reset Hourly units to 0
    document.getElementById('units-day').innerText = "0";     // Reset Daily units to 0
    document.getElementById('units-month').innerText = totalUnitsForMonth; // Set Monthly units
}

// This function is triggered when a date is clicked
function handleDateClick(day, month, year, daysInMonth) {
    console.log(`Selected date: ${day}-${month}-${year}`);

    // Placeholder total units for the month, replace with actual database query later
    const totalUnitsForMonth = parseInt(document.getElementById('units-month').innerText);

    // Calculate units for day and hour
    const unitsPerDay = totalUnitsForMonth / daysInMonth;
    const unitsPerHour = unitsPerDay / 24;

    // Update the usage boxes
    document.getElementById('units-hour').innerText = unitsPerHour.toFixed(2);  // Hourly units
    document.getElementById('units-day').innerText = unitsPerDay.toFixed(2);   // Daily units
    document.getElementById('units-month').innerText = "0";    // Reset Monthly units to 0 after a day is clicked
}

// Initialize the calendar with the current month/year
function initializeCalendar() {
    const today = new Date();
    document.getElementById('month').value = today.getMonth() + 1; // Set current month
    document.getElementById('year').value = today.getFullYear();   // Set current year
    updateCalendar(); // Call this to initialize the calendar
}

// Function to calculate the cost based on telescopic and non-telescopic rates
function calculateElectricityCost(units) {
    let cost = 0;

    // Telescopic rates for units <= 250
    if (units <= 50) {
        cost = units * 3.25;
    } else if (units <= 100) {
        cost = (50 * 3.25) + ((units - 50) * 4.05);
    } else if (units <= 150) {
        cost = (50 * 3.25) + (50 * 4.05) + ((units - 100) * 5.10);
    } else if (units <= 200) {
        cost = (50 * 3.25) + (50 * 4.05) + (50 * 5.10) + ((units - 150) * 6.95);
    } else if (units <= 250) {
        cost = (50 * 3.25) + (50 * 4.05) + (50 * 5.10) + (50 * 6.95) + ((units - 200) * 8.20);
    } 
    // Non-telescopic rates for units > 250
    else if (units <= 300) {
        cost = units * 6.40;
    } else if (units <= 350) {
        cost = units * 7.25;
    } else if (units <= 400) {
        cost = units * 7.60;
    } else if (units <= 500) {
        cost = units * 7.90;
    } else {
        cost = units * 8.80;
    }

    return cost;
}

// Function to update the usage cost based on the selected option
function updateUsageCost() {
    const selectedOption = document.getElementById('cal').value;

    // Get the number of units from your hour/day/month fields
    let units;
    switch (selectedOption) {
        case 'hr':
            units = parseFloat(document.getElementById('units-hour').innerText); // Get units for hours
            break;
        case 'day':
            units = parseFloat(document.getElementById('units-day').innerText); // Get units for days
            break;
        case 'month':
            units = parseFloat(document.getElementById('units-month').innerText); // Get units for months
            break;
        default:
            units = 0; // Fallback if no valid option
    }

    // Calculate the cost using the correct rates
    const cost = calculateElectricityCost(units);

    // Update the cost display in Indian Rupees
    const costBox = document.getElementById('blue');
    if (costBox) {
        costBox.innerText = `₹${cost.toFixed(2)}`; // Displaying the cost in Indian Rupees
    }
}

// Add event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar(); // Initialize the calendar on page load
    document.getElementById('cal').addEventListener('change', updateUsageCost); // Add change event listener to dropdown
    updateUsageCost(); // Call the function once on page load to set the default value
});








