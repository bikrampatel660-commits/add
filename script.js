// Array to store all registered students (in memory)
let registeredStudents = [];

// DOM elements
const form = document.getElementById('clubRegistrationForm');
const studentList = document.getElementById('studentList');
const emailError = document.getElementById('email-error');
const clubError = document.getElementById('club-error');

// --- Form Validation Functions ---

/**
 * Checks if the email is in a valid format using a simple regex.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidEmail(email) {
    // Basic regex: something@something.something
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates the entire form before submission.
 * @param {string} email - The email input value.
 * @param {string} club - The club selection value.
 * @returns {boolean} True if the form data is valid.
 */
function validateForm(email, club) {
    let isValid = true;

    // 1. Email Format Check
    if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email format (e.g., user@college.edu)';
        isValid = false;
    } else {
        emailError.textContent = ''; // Clear error
    }

    // 2. Club Selection Check
    if (club === "") {
        clubError.textContent = 'You must select a club to register.';
        isValid = false;
    } else {
        clubError.textContent = ''; // Clear error
    }

    return isValid;
}

// --- Dynamic List Update Function ---

/**
 * Renders the list of registered students dynamically to the DOM.
 */
function renderStudentList() {
    // Clear the current list content
    studentList.innerHTML = '';

    if (registeredStudents.length === 0) {
        // Show "No students registered" message if the list is empty
        const listItem = document.createElement('li');
        listItem.className = 'no-students';
        listItem.textContent = 'No students registered yet.';
        studentList.appendChild(listItem);
        return;
    }

    // Loop through the array and create an <li> for each student
    registeredStudents.forEach((student, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${student.name}</strong> (${student.department}) <br>
            * Club: **${student.club}** <br>
            * Email: <a href="mailto:${student.email}">${student.email}</a>
        `;
        studentList.appendChild(listItem);
    });
}

// --- Event Listener for Form Submission ---

form.addEventListener('submit', function(event) {
    // Prevent the default form submission (which reloads the page)
    event.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const department = document.getElementById('department').value;
    const email = document.getElementById('email').value.trim();
    const club = document.getElementById('club').value;

    // Run custom validation
    if (validateForm(email, club)) {
        // If validation passes, create a new student object
        const newStudent = {
            name: name,
            department: department,
            email: email,
            club: club
        };

        // 1. Add student to the in-memory array
        registeredStudents.push(newStudent);

        // 2. Update the displayed list
        renderStudentList();

        // 3. Reset the form fields for a new entry
        form.reset();

        // Optional: Alert the user of success
        alert(`${name} successfully registered for the ${club}!`);
    } else {
        // Validation failed, errors are already displayed next to fields
        console.log("Form validation failed. Please check the errors.");
    }
});

// Initial call to render the empty list on page load
document.addEventListener('DOMContentLoaded', renderStudentList);