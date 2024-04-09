# Travel Tracker

### Travel Tracker is a web application designed to help users visualize their visited countries on a map. It connects to a PostgreSQL database to extract visited country names, compares them against a table containing all countries' details, and then highlights the visited countries on the map. This project utilizes Express.js and Node.js for the backend, while EJS and JavaScript are used for the frontend.

## Features
Database Connectivity: Connects to a PostgreSQL database to retrieve visited country names and country details.
Data Extraction: Extracts visited country names from the database.
Country Comparison: Compares visited countries with a table containing all countries' details, including country codes.
Map Highlighting: Visually represents visited countries on a map for easy visualization.
Prerequisites
PostgreSQL
Node.js and npm
Basic knowledge of Express.js, EJS, and JavaScript
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Arjyan/Tavel-Tracker.git
Navigate to the project directory:

cd travel-tracker
Install dependencies:

bash
Copy code
npm install
Set up your PostgreSQL database and import necessary data.

Configure your database connection details in the **.js** file: 


`** pg.Client({
  user: "username",
  host: "localhost",
  database: "databasename",
  port: "portno",
  password: "uour oassword", 
});`

Start the server:

bash
Copy code
npm start
Visit http://localhost:3000 in your web browser.

The application will extract visited countries, compare them against the country details table, and display the highlighted map.

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.
