//Task 1 - Base Structure Created

document.addEventListener("DOMContentLoaded", function () {
    const ticketContainer = document.getElementById("ticketContainer");

    // Task 2 - Function to add a support ticket
    function addSupportTicket(customerName, issueDescription, priorityLevel) {
        const ticket = document.createElement("div");
        ticket.classList.add("ticket");

        const nameHeading = document.createElement("h3");
        nameHeading.textContent = customerName;

        const issueParagraph = document.createElement("p");
        issueParagraph.textContent = issueDescription;

        const priorityLabel = document.createElement("span");
        priorityLabel.textContent = `Priority: ${priorityLevel}`;
        priorityLabel.classList.add(priorityLevel.toLowerCase());

        const resolveButton = document.createElement("button");
        resolveButton.textContent = "Resolve";
        resolveButton.addEventListener("click", function (event) {
            event.stopPropagation();
            ticketContainer.removeChild(ticket);
        });

        ticket.appendChild(nameHeading);
        ticket.appendChild(issueParagraph);
        ticket.appendChild(priorityLabel);
        ticket.appendChild(resolveButton);
        ticketContainer.appendChild(ticket);
    }

    // Task 3 - Highlight high priority tickets
    function highlightHighPriorityTickets() {
        const tickets = document.querySelectorAll(".high");
        const ticketArray = Array.from(tickets);
        ticketArray.forEach(ticket => {
            ticket.style.backgroundColor = "red";
            ticket.style.color = "white";
            ticket.style.border = "2px solid black";
        });
    }

    // Task 4 - Event bubbling for ticket container
    ticketContainer.addEventListener("click", function () {
        console.log("A ticket was clicked!");
    });

    // Task 5 - Inline Editing for Support Tickets
    function enableInlineEditing(ticket) {
        ticket.addEventListener("dblclick", function () {
            const name = ticket.querySelector("h3");
            const issue = ticket.querySelector("p");
            const priority = ticket.querySelector("span");

            const nameInput = document.createElement("input");
            nameInput.value = name.textContent;

            const issueInput = document.createElement("input");
            issueInput.value = issue.textContent;

            const priorityInput = document.createElement("input");
            priorityInput.value = priority.textContent.replace("Priority: ", "");

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.addEventListener("click", function () {
                name.textContent = nameInput.value;
                issue.textContent = issueInput.value;
                priority.textContent = `Priority: ${priorityInput.value}`;
                
                ticket.replaceChild(name, nameInput);
                ticket.replaceChild(issue, issueInput);
                ticket.replaceChild(priority, priorityInput);
                ticket.removeChild(saveButton);
            });

            ticket.replaceChild(nameInput, name);
            ticket.replaceChild(issueInput, issue);
            ticket.replaceChild(priorityInput, priority);
            ticket.appendChild(saveButton);
        });
    }

    // Example: Adding tickets for testing
    addSupportTicket("John Doe", "Cannot access account", "High");
    addSupportTicket("Jane Smith", "Billing issue", "Medium");
    highlightHighPriorityTickets();
});
