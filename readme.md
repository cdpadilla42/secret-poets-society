# Secret Poets Society

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

My main objective with this project was to practice implementing passport to handle user authentication.
In addition, I planned and deployed different membership privileges as outlined above.
Inital planning for showing different views to different user levels involved putting much of the logic in handlebars.
Ultimately this proved inefficient. Instead, the app controller functions handle much of the logic for assessing the user privileges and
then rendering the appropriate view for the list of poems.

## Demo Link

[View app in browser](https://cryptic-oasis-68949.herokuapp.com/)

## Poem Credits

Authors are viewable by members. Major poets include Shel Silverstein, Walt Whitman, and Robert Frost
