// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const ticketForm = document.getElementById('newTicketForm');
    const ticketContainer = document.getElementById('ticketContainer');
    const highlightButton = document.getElementById('highlightHighPriority');
    
    // Counter to give each ticket a unique ID
    let ticketCounter = 1;
    
    // Task 2: Function to create a new support ticket
    function createSupportTicket(customerName, issueDescription, priorityLevel) {
        // Create the main ticket div
        const ticket = document.createElement('div');
        ticket.setAttribute('class', `ticket priority-${priorityLevel}`);
        ticket.setAttribute('id', `ticket-${ticketCounter++}`);
        
        // Create customer name heading
        const nameHeading = document.createElement('h3');
        nameHeading.textContent = customerName;
        
        // Create issue description paragraph
        const issuePara = document.createElement('p');
        issuePara.textContent = issueDescription;
        
        // Create priority label
        const priorityLabel = document.createElement('div');
        priorityLabel.setAttribute('class', 'priority-label');
        priorityLabel.innerHTML = `<strong>Priority:</strong> <span class="priority-text">${priorityLevel.charAt(0).toUpperCase() + priorityLevel.slice(1)}</span>`;
        
        // Create action buttons container
        const actionDiv = document.createElement('div');
        actionDiv.setAttribute('class', 'ticket-actions');
        
        // Create Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.setAttribute('class', 'edit-btn');
        
        // Create Resolve button
        const resolveButton = document.createElement('button');
        resolveButton.textContent = 'Resolve';
        resolveButton.setAttribute('class', 'resolve-btn');
        
        // Add buttons to action div
        actionDiv.appendChild(editButton);
        actionDiv.appendChild(resolveButton);
        
        // Append all elements to the ticket
        ticket.appendChild(nameHeading);
        ticket.appendChild(issuePara);
        ticket.appendChild(priorityLabel);
        ticket.appendChild(actionDiv);
        
        // Add click event to the ticket (for bubbling demonstration)
        ticket.addEventListener('click', function(event) {
            console.log(`Ticket ${this.id} was clicked (bubbled event)`);
        });
        
        // Task 4: Add click event to the Resolve button
        resolveButton.addEventListener('click', function(event) {
            // Stop event from bubbling up
            event.stopPropagation();
            
            // Remove the ticket
            ticket.parentNode.removeChild(ticket);
            console.log(`Ticket ${ticket.id} has been resolved and removed`);
        });
        
        // Task 5: Add edit functionality
        editButton.addEventListener('click', function(event) {
            // Stop event from bubbling
            event.stopPropagation();
            
            // Toggle edit mode
            if (ticket.classList.contains('edit-mode')) {
                return; // If already in edit mode, do nothing
            }
            
            // Add edit mode class
            ticket.classList.add('edit-mode');
            
            // Create input for customer name
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = nameHeading.textContent;
            
            // Create textarea for issue description
            const issueTextarea = document.createElement('textarea');
            issueTextarea.rows = 3;
            issueTextarea.value = issuePara.textContent;
            
            // Create select for priority
            const prioritySelect = document.createElement('select');
            
            const lowOption = document.createElement('option');
            lowOption.value = 'low';
            lowOption.textContent = 'Low';
            
            const mediumOption = document.createElement('option');
            mediumOption.value = 'medium';
            mediumOption.textContent = 'Medium';
            
            const highOption = document.createElement('option');
            highOption.value = 'high';
            highOption.textContent = 'High';
            
            prioritySelect.appendChild(lowOption);
            prioritySelect.appendChild(mediumOption);
            prioritySelect.appendChild(highOption);
            
            // Set current priority
            const currentPriority = priorityLabel.querySelector('.priority-text').textContent.toLowerCase();
            prioritySelect.value = currentPriority;
            
            // Replace content with form inputs
            nameHeading.innerHTML = '';
            nameHeading.appendChild(nameInput);
            
            issuePara.innerHTML = '';
            issuePara.appendChild(issueTextarea);
            
            priorityLabel.innerHTML = '<strong>Priority:</strong> ';
            priorityLabel.appendChild(prioritySelect);
            
            // Change edit button to save button
            editButton.textContent = 'Save';
            editButton.setAttribute('class', 'save-btn');
            
            // Add event listener to save button
            editButton.onclick = function(e) {
                e.stopPropagation();
                
                // Update ticket with new values
                const newName = nameInput.value;
                const newIssue = issueTextarea.value;
                const newPriority = prioritySelect.value;
                
                // Update the ticket content
                nameHeading.textContent = newName;
                issuePara.textContent = newIssue;
                priorityLabel.innerHTML = `<strong>Priority:</strong> <span class="priority-text">${newPriority.charAt(0).toUpperCase() + newPriority.slice(1)}</span>`;
                
                // Update ticket class for priority styling
                ticket.classList.remove('priority-low', 'priority-medium', 'priority-high');
                ticket.classList.add(`priority-${newPriority}`);
                
                // Reset edit button
                editButton.textContent = 'Edit';
                editButton.setAttribute('class', 'edit-btn');
                
                // Remove edit mode class
                ticket.classList.remove('edit-mode');
                
                // Reset onclick handler
                editButton.onclick = null;
            };
        });
        
        // Return the ticket element
        return ticket;
    }
    
    // Task 3: Function to highlight high priority tickets
    function highlightHighPriorityTickets() {
        // Select all high priority tickets
        const highPriorityTickets = document.querySelectorAll('.priority-high');
        
        // Convert NodeList to array
        const ticketsArray = Array.from(highPriorityTickets);
        
        // Apply highlighting to each high priority ticket
        ticketsArray.forEach(ticket => {
            // Add animation to make them more visible
            ticket.style.animation = 'pulse 1.5s infinite';
            ticket.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.7)';
            
            // Optional: add this to your CSS
            document.head.insertAdjacentHTML('beforeend', `
                <style>
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.03); }
                        100% { transform: scale(1); }
                    }
                </style>
            `);
        });
        
        console.log(`Highlighted ${ticketsArray.length} high priority tickets`);
    }
    
    // Event listener for the ticket form submission
    ticketForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get values from the form
        const customerName = document.getElementById('customerName').value;
        const issueDescription = document.getElementById('issueDescription').value;
        const priorityLevel = document.getElementById('priorityLevel').value;
        
        // Create a new ticket
        const newTicket = createSupportTicket(customerName, issueDescription, priorityLevel);
        
        // Add the ticket to the container
        ticketContainer.appendChild(newTicket);
        
        // Clear the form
        ticketForm.reset();
    });
    
    // Event listener for highlighting high priority tickets
    highlightButton.addEventListener('click', highlightHighPriorityTickets);
    
    // Task 4: Add event listener to ticket container for event bubbling demonstration
    ticketContainer.addEventListener('click', function(event) {
        console.log('Ticket container was clicked (parent event)');
    });
    
    // Creating a few sample tickets to start with
    const sampleTickets = [
        {
            name: 'John Doe',
            issue: 'Unable to reset password after multiple attempts',
            priority: 'high'
        },
        {
            name: 'Jane Smith',
            issue: 'Product search returning incorrect results',
            priority: 'medium'
        },
        {
            name: 'Bob Johnson',
            issue: 'Question about subscription renewal options',
            priority: 'low'
        }
    ];
    
    // Add sample tickets to the page
    sampleTickets.forEach(ticket => {
        const newTicket = createSupportTicket(ticket.name, ticket.issue, ticket.priority);
        ticketContainer.appendChild(newTicket);
    });
});
