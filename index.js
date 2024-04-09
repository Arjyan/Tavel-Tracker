import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connecting to postgres
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "helloWorld",
  port: "5432",
  password: "Arjyan@123",
});
db.connect();
//visited countries in the db file
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", (req, res) => {
  db.query("SELECT country_code FROM visited_countries", (err, result) => {
    //----- checking if the query is running fine
    if (err) {
      console.error("Error executing query:", err);
    } else if (result) {
      //this is to check if the result is fetching correctly or not.
      // console.log("Query result:", result.rows); //to get the id
      let countries = [];
      result.rows.forEach((country) => {
        countries.push(country.country_code);
      });
      //-----
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
      });
    }
  });
});


//Adding additional functionality so that the user can interact with the web page
app.post("/add", async (req, res) => {
  let input = req.body["country"];
  input=input.toLowerCase();
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name LIKE '%' || $1 || '%';",
      [input]
    );
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
