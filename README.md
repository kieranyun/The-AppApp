# MochiAppApp
An API to apply to a fly company called Mochi. 
Built with Node.js, Express, Monitored by PM2, deployed on AWS.

:bulb:  Made by Kieran Yun.

## How to access the API
simply open a terminal and try out the following cURL commands!

#### There are 5 routes available 
#### POST /registration 
   given a properly formatted JSON object, it will register a new user to the database. Post this route to add a user to the database, then post the next command to post an order by the newly made user. 
   
   ```
curl -d '{"customerID": "9999999","firstName": "Kieran",
"lastName": "Yun", "dob": "1993-09-04","city": "San Francisco", "country": "Nepal","countryCode": "NP","email": "fake.email1@gmail.com"}' -H 'Content-Type: application/json' http://54.241.231.10/registration
 ```
 
#### POST /orders
   given a properly formatted JSON object, it will register a new order to the database. The following link will work once, change the id to post another order. 
   
```
curl -d '{"orderID": "9999999","firstName": "Kieran",
"lastName": "Yun","email": "fake.email1@gmail.com","item": "Bespoke Applications"}' -H 'Content-Type: application/json' http://54.241.231.10/orders
 ```
   
#### GET /customers
   a get request to this endpoint will return a list of customers. It will return them a page at a time with optional query parameters page and count
   ```
   curl -X GET http://54.241.231.10/customers?page=2&count=10
   ```
#### GET /customers/:customerID
   if you have a customer's ID you can search for their info with this endpoint, replace the last subdirectory with any int between 1 and 1,000,000 for a random customer!
   ```
   curl -X GET http://54.241.231.10/customers/42358
   ```
#### GET /orders/:orderID
   with an orderID, you can search for an order's info at this endpoint. 
   ```
   curl -X GET http://54.241.231.10/orders/423458
   ```
   
## The database
It's got just north of 1 million randomly generated customers and 1 million orders!
![Screen Shot 2022-08-06 at 12 12 38 AM](https://user-images.githubusercontent.com/18022276/183265784-6a905231-65ec-46cc-b21a-cf494031bbbe.png)

## Testing
The API is still very simple, it is missing validation and could use more elegant error handling! 
![Screen Shot 2022-08-06 at 1 54 45 PM](https://user-images.githubusercontent.com/18022276/183265779-b450443d-0cf0-4d8f-a343-87ce99fc69e9.png)


