<?php
while (true) {
    exec('php artisan schedule:run');
    echo("executed ");
    sleep(30); // Wait for 60 seconds
}