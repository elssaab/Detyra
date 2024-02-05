<?php
include 'config.php';

$sql = "SELECT id, title, completed FROM todos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $todos[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'completed' => (bool)$row['completed'],
        ];
    }
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($todos);
} else {
    echo json_encode([]);
}

$conn->close();
?>
