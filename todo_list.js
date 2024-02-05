// todo_list.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display To-Do items
    fetchTodoData();
});

function fetchTodoData() {
    // Use AJAX or fetch to retrieve To-Do data from PHP
    fetch('get_todos.php') // Adjust the PHP script name based on your implementation
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to the console for debugging
            // Call a function to update the HTML with the received data
            updateTodoList(data);
        })
        .catch(error => {
            console.error('Error fetching To-Do data:', error);
        });
}

function updateTodoList(todoData) {
    // Get the #todoList ul element
    var todoListElement = document.getElementById('todoList');

    // Clear any existing content
    todoListElement.innerHTML = '';

    // Check if there are To-Do items
    if (todoData.length > 0) {
        // Loop through the todoData and create HTML elements for each To-Do item
        todoData.forEach(todo => {
            var todoItem = document.createElement('li');
            todoItem.innerHTML = `
                
                <span>${todo.title}</span>
                <button onclick="editTodoForm(${todo.id}, '${todo.title}', '${todo.description}')">Edit</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            todoListElement.appendChild(todoItem);
        });
    } else {
        // Display a message if there are no To-Do items
        todoListElement.innerHTML = 'No To-Do items found';
    }
}

// Function to update the status of a To-Do item
function updateTodoStatus(todoId) {
    // Use fetch API to send data to handle_todo.php for updating status
    fetch('handle_todo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=update_todo&id=${todoId}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response for debugging
        fetchTodoData(); // Fetch updated To-Do data after status update
    })
    .catch(error => {
        console.error('Error updating To-Do status:', error);
    });
}

// Function to open a simple edit form for a To-Do item
function editTodoForm(todoId, title, description, completed) {
    // Create a simple form for editing
    var form = document.createElement('form');
    form.innerHTML = `
        <label for="editTitle">Title:</label>
        <input type="text" id="editTitle" name="editTitle" value="${title}" required>

        <label for="editDescription">Description:</label>
        <textarea id="editDescription" name="editDescription" required>${description}</textarea>

        <label for="editCompleted">Completed:</label>
        <input type="checkbox" id="editCompleted" name="editCompleted" ${completed ? 'checked' : ''}>

        <button type="button" onclick="updateTodo(${todoId})">Update</button>
    `;

    // Add some styles to the form
    form.style.border = '1px solid #ccc';
    form.style.padding = '10px';
    form.style.marginTop = '10px';

    // Style the labels
    form.querySelectorAll('label').forEach(label => {
        label.style.display = 'block';
        label.style.marginBottom = '5px';
    });

    // Style the input fields
    form.querySelectorAll('input, textarea').forEach(input => {
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.marginBottom = '10px';
        input.style.boxSizing = 'border-box';
    });

    // Style the checkbox
    var checkbox = form.querySelector('#editCompleted');
    checkbox.style.width = 'auto';

    // Replace the content of the #todoList element with the styled edit form
    var todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = '';
    todoListElement.appendChild(form);
}
// Function to update a To-Do item with the values from the edit form
function updateTodo(todoId) {
    var updatedTitle = document.getElementById('editTitle').value;
    var updatedDescription = document.getElementById('editDescription').value;
    var updatedCompleted = document.getElementById('editCompleted').checked ? 1 : 0;

    // Use fetch API to send data to handle_todo.php for updating
    fetch('handle_todo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=update_todo&id=${todoId}&title=${updatedTitle}&description=${updatedDescription}&completed=${updatedCompleted}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response for debugging
        fetchTodoData(); // Fetch updated To-Do data after update
    })
    .catch(error => {
        console.error('Error updating To-Do:', error);
    });
}

// Function to delete a To-Do item
function deleteTodo(todoId) {
    // Use fetch API to send data to handle_todo.php for deleting
    fetch('handle_todo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=delete_todo&id=${todoId}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response for debugging
        fetchTodoData(); // Fetch updated To-Do data after deletion
    })
    .catch(error => {
        console.error('Error deleting To-Do:', error);
    });
}
