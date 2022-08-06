# MochiAppApp
An API to apply to a fly company called Mochi. 
Made by Kieran Yun.

## How to access the API
simply go to http://54.241.231.10/ and then tack on a subdirectory for more.

#### There are 5 routes available 
#### POST /registration 
   given a properly formatted JSON object, it will register a new user to the database
#### POST /orders
   given a properly formatted JSON object, it will register a new order to the database
#### GET /customers
   a get request to this endpoint will return a list of customers. It will return them a page at a time with optional query parameters page and count
#### GET /customers/:customerID
   if you have a customer's ID you can search for their info with this endpoint
#### GET /orders/:orderID
   with an orderID, you can search for an order's info at this endpoint. 
   
## The database
It's got just north of 1 million randomly generated customers and 1 million orders!
