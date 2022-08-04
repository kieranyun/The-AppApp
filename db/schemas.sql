DROP TABLE IF EXISTS Countries;
CREATE TABLE Countries (
  id SERIAL PRIMARY KEY,
  country VARCHAR (60),
  country_code VARCHAR (60),
  alpha3 VARCHAR (60),
  country_num VARCHAR (60),
  iso_something VARCHAR (60),
  continent VARCHAR (60),
  sub_region VARCHAR (60),
  intermed_region VARCHAR (60),
  region_code VARCHAR (60),
  sub_region_code VARCHAR (60),
  intermed_region_code VARCHAR (60)
);

DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (60),
  last_name VARCHAR (60),
  DOB DATE,
  city VARCHAR (60),
  country_id INT,
  email VARCHAR (60) UNIQUE,
  FOREIGN KEY (country_id) REFERENCES Countries (id)
);

DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  order_date TIMESTAMP,
  item VARCHAR (60),
  FOREIGN KEY (customer_id) REFERENCES Customers (id)
);
