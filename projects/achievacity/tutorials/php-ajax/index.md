# Creating a PHP AJAX File for Achievacity
## Intro
Every AJAX file should...

 - check if the request is valid. See the example for how to do this.
 - use UserSpice's backend API. Include `users/init.php` for this.
 - return an array as JSON. If the file is meant for querying data from the database, the array will be the response. Otherwise, it should have a boolean `success` attribute, along with a `message`, describing the error or success. Even if the file is meant for querying data, and it fails, it should return `success => false` along with an error message. **Note: the error message shouldn't be too specific, as that could be a security vulnerability. Instead, use something like `An internal error occurred`.**

## Example
```
/*
 * Foos up the database. User must be logged in, and the database must not be foo'd already.
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');
    require_once "../../../users/init.php";	// ew TODO: figure absolute/relative paths out

    $db = DB::getInstance();

    $db->foo();

    if ($db->error()) {
        $return = [
            'success' => false,
            'message' => 'An internal error occurred while fooing the database.'
        ];
    } else {
        $return = [
            'success' => true,
            'message' => 'Database foo\'d up successfully!''
        ];
    }
    echo json_encode($return);
}
```
