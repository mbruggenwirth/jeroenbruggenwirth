<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

	'*' => array(
		'server' => 'localhost',
		'database' => 'jeroenbruggenwirth',
		'user' => 'root',
		'password' => 'root',
		'tablePrefix' => 'craft'
	),
	'development.jeroenbruggenwirth.com' => array(
		'database' => 'bruggenwir_dev',
		'user' => 'bruggenwir_dev',
		'password' => 'XbDdAIsQ',
	)
);
