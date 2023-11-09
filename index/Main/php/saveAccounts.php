<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $postData = file_get_contents('php://input');
  $data = json_decode($postData, true);

  if ($data) {
    $jsonFileName = '../saves/Accounts.json';
    file_put_contents($jsonFileName, json_encode($data));

    echo json_encode(['message' => 'Daten erfolgreich gespeichert']);
  } else {
    http_response_code(400); // Fehlerhafte Anfrage
    echo json_encode(['message' => 'Ungültige Daten']);
  }
} else {
  http_response_code(405); // Methode nicht erlaubt
  echo json_encode(['message' => 'Methode nicht erlaubt']);
}
?>
