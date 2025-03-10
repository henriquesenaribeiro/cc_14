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
