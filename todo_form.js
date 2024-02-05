document.addEventListener('DOMContentLoaded', function () {
    var todoForm = document.getElementById('todoForm');

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        var formData = new FormData(todoForm);

        // Add an action to indicate whether it's an add or update operation
        var action = formData.get('id') ? 'update_todo' : 'add_todo';
        formData.append('action', action);

        // Use fetch API to send data to handle_todo.php
        fetch('handle_todo.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response for debugging

            // Check the response for success and handle accordingly
            if (data.success) {
                alert(data.message);
                window.location.href = 'todo_list.html'; // Redirect to the list after successful submission
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

