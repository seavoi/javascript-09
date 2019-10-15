Treehouse JavaScript // Project 9: REST API

Sean Voigts (https://teamtreehouse.com/projects/rest-api)

## Greetings

Task list:

**User Routes**

  - ~~Location for create users~~ *Done!*


**Course Routes**

  - GET courses missing user owner **GETING ERROR: "SequelizeEagerLoadingError: User is not associated to Course!"**

  - GET courses/:id missing user owner

  - POST/PUT/DELETE user authentication **Bug** When I get an authentication failure the requested route still runs which isn't ideal

  - ~~Location for create courses~~ *Done!*


**Password**

  - ~~POST users route doesn't hash user's password~~ *Done!*


**Permissions**

  - Missing Express middleware to authenticate one more of the specified routes

  - When authentication fails a 401 status code isn't retured






{
    "firstName": "Tess",
    "lastName": "Terrill",
    "emailAddress": "tess@terrill.com",
    "password": "tesspassword"
}

{
  "userId": 3,
  "title": "Art History 101",
  "description": "Paintings and sculptures - oh my."
}