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
