import mysql from 'mysql2';

/**
 * @type {mysql.Connection}
 */
let mysqlcon;

if (process.env.NODE_ENV === 'development') {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	if (!global._mysqlcon) {
		global._mysqlcon = mysql.createConnection({
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PW,
			database: process.env.MYSQL_DB,
		});
	}
	mysqlcon = global._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable.
	mysqlcon = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PW,
		database: process.env.MYSQL_DB,
	});
}

export default mysqlcon;
