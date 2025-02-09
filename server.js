const express = require('express'); 
const sql = require('mssql');

const app = express();
const port = 5000;

// Database Configuration
const dbConfig = {
    server: 'localhost',         // SQL Server address (localhost for local server)
    database: 'PasswordManagerDB', // Your database name
    options: {
        trustedConnection: true, // Use Windows Authentication
        encrypt: false,          // Set to true if using SSL
    }
};

// Create SQL Server connection pool
sql.connect(dbConfig)
    .then(pool => {
        console.log('Connected to SQL Server');
        // Define API endpoints here
        app.get('/data', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM your_table');
                res.json(result.recordset);
            } catch (err) {
                console.error(err);
                res.status(500).send('Error occurred');
            }
        });
    })
    .catch(err => {
        console.error('SQL Server connection error: ', err);
    });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
