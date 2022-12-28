# Secret Poets Society

[View app in browser](https://secret-poets-society.onrender.com/)

## Message Board Utilizing User Authentication

The Secret Poets Society is a club of artists sharing work purely for arts sake.
Not for fame or glory! As part of the practice, the authors names are unlisted to visitors.

The site has three tiers of membership - guest, member, and admin.

- GUESTS can sign up and login to post their own poems, joining in the art for art's sake movement.
- MEMBERS have the added privilege of seeing which of their colleauges posted which poem and on what date.
- ADMINS can see what members see and also have the ability to delete any poem they see fit.

Tech used:

- NodeJS
- Express
- MongoDB & Mongoose
- Passport
- Handlebars.js
- Custom CSS

## MVC Design Pattern

This Node application follows the Model-View-Controller approach to design. Files are organized into their roles within the system. The Mongoose ORM serves as the data model, Handlebars.js is used for templating views, and Express routes and middleware serve as the controllers. Controllers are the bulk of this application, handling data validation, sanitization, and user authentication.

To handle authorization, the Passport package is used to coordinate login. Express Sessions are then used to maintain the user’s account session with the server. User data is stored in MongoDB, including encrypted login information and their membership tier. If a user is accessing a protected route, a specific controller is accessed. With the controller functions, the logged in user’s membership tier is checked against the permissions required for a given request. If they do not have the correct authorization, the user receives an error message rendered by the application. Otherwise, they are granted access.

## Data Security & Sanitization

My greatest area of learning through this application was Security and sanitization. Incoming data has the potential to be incorrect or, worse, malicious. The Express Validator package is used to clean the data of any malicious code. Another method with the Validator package ensures the inputs match the expected types and provide the required fields.

A special case is user login data, where the password needs an extra layer of security. A custom implementation of passport brings in BCrypt, a library for string encryption, to securely save a hashed password and decrypt it when the user is attempting to log in. This ensures if the network request is intercepted or if the database is accessed outside the application, critical data is not exposed.

## Challenges

While it was a pleasure using a new UI library, I quickly discovered that Handlebars.js has it’s limitations. The library can handle a fair amount of conditional rendering. But, as the application grew more complex, I found myself trying to make views reusable through logic that Handlebars didn’t support. For example, sharing form elements from the login page and the account creation page. This comes from my experience of working heavily in React, a library that makes breaking a page into components accessible and flexible.

The solution was to approach views from a page level, allowing there to be separate pages to share a fair amount of layout formatting, but to make the small tweaks necessary to better suit a page’s needs. Working with handlebars, it was still possible to utilize conditional rendering of items, such as the authors of the poems, while still allowing the server to perform the heavy lifting of logic.

## Next Steps

Much of what I learned in this project transitioned into a later application, Mystery-Cowboy-Theater. Another Node application, I took the pains I felt while using Handlebars’ page approach and switched over to React to break down the UI into components. Authorization was carried over into that project as well, this time using JWT’s to pass user data between the client and API.

## Poem Credits

Authors are viewable by members. Major poets include Shel Silverstein, Walt Whitman, and Robert Frost
