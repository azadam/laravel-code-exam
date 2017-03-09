## Setup - Build Environment

This code should run in any valid Laravel configuration, but was tested and built on:
 - Apache 2.4.25
 - PHP 5.6.30
 - MariaDB 10.1.21

## Database Considerations

You should be able to run this code against any Eloquent supported RDBS as long as you update the .env DB config lines appropriately. Make sure you've set up any needed permissions; user access to create schemas and data, or filesystem access for the web server to write to the sqlite file.

## .env configuration

The .env.example file has been updated to indicate the basic config needed to start up. Copy this over to .env and update appropriately.


## Steps to start it up
 - check out the code into an appropriate location for serving via apache (or your preferred Laravel dev method)
 - copy the .env.example file to .env and modify to suit your environment
 - run `composer install` (to bring in all the Laravel libraries and dependencies)
 - run `php artisan migrate` (to initialize the database table for task storage)
 - access the public folder of the app through apache!
