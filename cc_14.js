//Task 1 - Base Structure Created

// Select the body element
const body = document.body;

// Create the header and set its content
const header = document.createElement("header");
header.innerHTML = "<h1>Customer Support Ticket System</h1>";
body.appendChild(header);

// Create the main section
const main = document.createElement("main");

// Create the container for support tickets
const ticketContainer = document.createElement("div");
ticketContainer.id = "ticketContainer"; // Assign an ID for dynamic ticket addition
main.appendChild(ticketContainer);

// Append the main section to the body
body.appendChild(main);

// Create the footer and set its content
const footer = document.createElement("footer");
footer.innerHTML = "<p>&copy; 2025 Support System Inc.</p>";
body.appendChild(footer);

// Confirmation in the console
console.log("Task 1 - Base Structure Created: Header, Main, and Footer added.");

//Task 2 - Support Tickets Dynamic Addition

// Function to add a new support ticket dynamically
function addTicket(name, issue, priority) {
    const ticketContainer = document.getElementById("ticketContainer");

    // Create the main ticket container
    const ticket = document.createElement("div");
    ticket.classList.add("ticket");

    // Create and add customer name element
    const nameElement = document.createElement("h3");
    nameElement.textContent = `Customer: ${name}`;
    ticket.appendChild(nameElement);

    // Create and add issue description element
    const issueElement = document.createElement("p");
    issueElement.textContent = `Issue: ${issue}`;
    ticket.appendChild(issueElement);

    // Create and add priority label
    const priorityElement = document.createElement("span");
    priorityElement.textContent = `Priority: ${priority}`;
    priorityElement.classList.add(priority.toLowerCase() + "-priority"); // Adds class based on priority
    ticket.appendChild(priorityElement);

    // Create and add resolve button
    const resolveBtn = document.createElement("button");
    resolveBtn.textContent = "Resolve";
    resolveBtn.classList.add("resolve-btn"); // Add class for selection
    ticket.appendChild(resolveBtn);

    // Append the complete ticket to the container
    ticketContainer.appendChild(ticket);
}

// Example: Adding a test ticket when a button is clicked
document.getElementById("addTicketBtn").addEventListener("click", function () {
    addTicket("John Doe", "Unable to access account.", "High");
});

// Task 3 - Highlighting High Priority Tickets

// Function to highlight high-priority tickets
function highlightHighPriorityTickets() {
    // Select all elements with the class "high-priority"
    const highPriorityTickets = document.querySelectorAll(".high-priority");

    // Convert NodeList to an array and apply styles
    Array.from(highPriorityTickets).forEach(function(ticket) {
        ticket.parentElement.style.backgroundColor = "lightcoral"; // Change background color
        ticket.parentElement.style.border = "2px solid red"; // Add a red border for visibility
    });
}

// Example: Highlight high-priority tickets when adding a new one
document.getElementById("addTicketBtn").addEventListener("click", function () {
    addTicket("Jane Smith", "Payment not processed.", "High"); // Example high-priority ticket
    highlightHighPriorityTickets(); // Apply highlithing
});

//Task 4 - Support Ticket Resolution with Event Bubbling

// Event listener for handling ticket clicks
document.getElementById("ticketContainer").addEventListener("click", function(event) {
    // Check if the clicked element is the "Resolve" button
    if (event.target.classList.contains("resolve-btn")) {
        event.stopPropagation(); // Prevent event bubbling to the container
        event.target.parentElement.remove(); // Remove the entire ticket
    } else {
        console.log("Ticket clicked."); // Log message when clicking anywhere else in a ticket
    }
});

// Task 5 - Inline Editing for Support Tickets

// Event listener for double-clicking to edit a ticket
document.getElementById("ticketContainer").addEventListener("dblclick", function(event) {
    const ticket = event.target.closest(".ticket"); // Find the closest ticket div
    if (!ticket) return; // Exit if no ticket was clicked

    // Extract current ticket details
    const nameText = ticket.querySelector("h3").textContent.replace("Customer: ", "");
    const issueText = ticket.querySelector("p").textContent.replace("Issue: ", "");
    const priorityText = ticket.querySelector("span").textContent.replace("Priority: ", "");

    // Create input fields with pre-filled existing values
    const nameInput = document.createElement("input");
    nameInput.value = nameText;

    const issueInput = document.createElement("input");
    issueInput.value = issueText;

    // Create a dropdown for selecting priority
    const priorityInput = document.createElement("select");
    ["Low", "Medium", "High"].forEach(function(level) {
        let option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        if (level === priorityText) option.selected = true; // Set the current priority as selected
        priorityInput.appendChild(option);
    });

    // Create save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    // Clear ticket content and replace with input fields
    ticket.innerHTML = "";
    ticket.appendChild(nameInput);
    ticket.appendChild(issueInput);
    ticket.appendChild(priorityInput);
    ticket.appendChild(saveBtn);

    // Handle saving the new details
    saveBtn.addEventListener("click", function() {
        ticket.innerHTML = `
            <h3>Customer: ${nameInput.value}</h3>
            <p>Issue: ${issueInput.value}</p>
            <span class="${priorityInput.value.toLowerCase()}-priority">Priority: ${priorityInput.value}</span>
            <button class="resolve-btn">Resolve</button>
        `;
    });
});
