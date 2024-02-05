<?php
include 'config.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle different actions based on the data received

    // For adding a To-Do item
    if (isset($_POST['action']) && $_POST['action'] === 'add_todo') {
        $title = $_POST['title'];
        $description = $_POST['description'];

        // Insert new To-Do item into the database
        $sql = "INSERT INTO todos (title, description, completed, created_at) VALUES ('$title', '$description', 0, NOW())";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'To-Do added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error adding To-Do: ' . $conn->error]);
        }
    }

    // For updating a To-Do item
    elseif (isset($_POST['action']) && $_POST['action'] === 'update_todo') {
        $todoId = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $completed = $_POST['completed'];

        // Update the To-Do item in the database
        $sql = "UPDATE todos SET title='$title', description='$description', completed=$completed WHERE id=$todoId";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'To-Do updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error updating To-Do: ' . $conn->error]);
        }
    }

    // For deleting a To-Do item
    elseif (isset($_POST['action']) && $_POST['action'] === 'delete_todo') {
        $todoId = $_POST['id'];

        // Delete the To-Do item from the database
        $sql = "DELETE FROM todos WHERE id=$todoId";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'To-Do deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting To-Do: ' . $conn->error]);
        }
    }

    // Add other actions as needed
    // ...

} else {
    // If the request method is not POST, return an error response
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>
