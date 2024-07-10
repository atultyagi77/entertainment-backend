#Welcome to the Entertainment Backend System API

Overview
This project provides a robust API for user authentication and authorization. It includes endpoints for user login, user signup with encrypted passwords, and user logout functionality. This system ensures secure user account management with encrypted credentials and token-based authentication.

Endpoints
/api/login
Method: POST

Description: Endpoint for user login.

Request Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "userpassword"
}
Response:

Success: Returns a JSON Web Token (JWT) which should be included in subsequent requests for authentication.
json
Copy code
{
  "Response": "User login successfully.",
  "token": "jwt_token_here",
  "name": "User Name",
  "email": "user@example.com"
}
Error: Returns an appropriate error message.
/api/signup
Method: POST

Description: Endpoint for user signup.

Request Body:

json
Copy code
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "userpassword"
}
Response:

Success: Returns a success message indicating the user has been created.
json
Copy code
{
  "Message": "User created successfully."
}
Error: Returns an appropriate error message.
/api/logout
Method: DELETE

Description: Endpoint for user logout.

Request Header:

makefile
Copy code
Authorization: Bearer <JWT>
Response:

Success: Returns a success message indicating the user has been logged out.
json
Copy code
{
  "message": "User logged out successfully."
}
Error: Returns an appropriate error message.
/
Method: GET

Description: Default or home path.

Response:

Success: Returns a welcome message.
json
Copy code
{
  "message": "Welcome to the entertainment app"
}

Technologies Used

Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.

Express.js: Web framework for Node.js.

bcryptjs: Library to hash passwords.

mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.

JSON Web Tokens (JWT): Compact, URL-safe means of representing claims to be transferred between two parties.


Contact
For any inquiries, please contact tyagiatul23799@gmail.com.

