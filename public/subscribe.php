<?php
/**
 * Newsletter signup endpoint for the Bucket List one-pager.
 *
 * Vite copies everything in /public into /dist, so this file is uploaded
 * alongside the built site (e.g. public_html/bucketlist/subscribe.php).
 *
 * Emails are appended to a CSV that lives OUTSIDE the web root
 * (<site root>/bucketlist-data/subscribers.csv), so it can never be
 * downloaded by URL. Download it from SiteGround Site Tools → File Manager.
 */

// Optional: get an email each time someone signs up. Leave empty to disable.
// Use an address on your own domain for best deliverability.
const NOTIFY_TO = '';

// Max signups accepted per visitor per hour (basic spam throttle).
const MAX_PER_HOUR = 5;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Accept JSON or regular form posts.
$input = $_POST;
if (!$input) {
    $decoded = json_decode(file_get_contents('php://input'), true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

// Honeypot: real visitors never see or fill this field. Pretend success
// so bots don't learn they were filtered.
if (!empty($input['website'])) {
    respond(200, ['ok' => true]);
}

$email = strtolower(trim((string)($input['email'] ?? '')));
if ($email === '' || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}

// Storage lives one level above the web root.
$root = $_SERVER['DOCUMENT_ROOT'] ?? '';
$dir  = dirname($root) . '/bucketlist-data';
if (!is_dir($dir) && !@mkdir($dir, 0750, true)) {
    error_log('subscribe.php: cannot create ' . $dir);
    respond(500, ['ok' => false, 'error' => 'Something went wrong. Please try again later.']);
}

// Throttle by hashed IP — the raw address is never stored.
$ipKey = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('YmdH'));
$rateFile = $dir . '/rate-' . substr($ipKey, 0, 16) . '.count';
$count = is_file($rateFile) ? (int)file_get_contents($rateFile) : 0;
if ($count >= MAX_PER_HOUR) {
    respond(429, ['ok' => false, 'error' => 'Too many attempts. Please try again later.']);
}
file_put_contents($rateFile, (string)($count + 1), LOCK_EX);
// Tidy up stale counters (older than 2 hours).
foreach (glob($dir . '/rate-*.count') ?: [] as $f) {
    if (filemtime($f) < time() - 7200) {
        @unlink($f);
    }
}

$csv = $dir . '/subscribers.csv';
$fh = @fopen($csv, 'c+');
if (!$fh) {
    error_log('subscribe.php: cannot open ' . $csv);
    respond(500, ['ok' => false, 'error' => 'Something went wrong. Please try again later.']);
}
flock($fh, LOCK_EX);

$isNew = true;
$size = fstat($fh)['size'];
if ($size === 0) {
    fputcsv($fh, ['subscribed_at', 'email', 'source']);
} else {
    rewind($fh);
    fgetcsv($fh); // header
    while (($row = fgetcsv($fh)) !== false) {
        if (isset($row[1]) && strtolower(ltrim($row[1], "'")) === $email) {
            $isNew = false;
            break;
        }
    }
}

if ($isNew) {
    fseek($fh, 0, SEEK_END);
    // Neutralise spreadsheet formula injection (=, +, -, @ at the start).
    $safe = preg_match('/^[=+\-@]/', $email) ? "'" . $email : $email;
    $source = substr(preg_replace('/[^\w\-\/.]/', '', (string)($input['source'] ?? 'footer')), 0, 60);
    fputcsv($fh, [date('Y-m-d H:i:s'), $safe, $source]);
}

flock($fh, LOCK_UN);
fclose($fh);

if ($isNew && NOTIFY_TO !== '') {
    // Send from the site's own domain so SiteGround's mail() accepts it.
    $host = preg_replace('/[^a-z0-9.\-]/', '', strtolower(preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost')));
    @mail(
        NOTIFY_TO,
        'New Bucket List signup',
        "New signup: $email\nTime: " . date('c') . "\n",
        'From: no-reply@' . $host . "\r\nContent-Type: text/plain; charset=utf-8"
    );
}

// Same response for new and duplicate signups.
respond(200, ['ok' => true]);
