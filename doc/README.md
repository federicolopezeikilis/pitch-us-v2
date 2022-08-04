# PitchUs

## Intro

![](https://media.giphy.com/media/3o72EX5QZ9N9d51dqo/giphy.gif)

PItchUs is a social media for musicians who want to play and share song interpretations. It is created to encourage musicians to interact with each other and have the freedom to publish their interpretations with fewer restrictions.

## Funcional Description

### Use Cases
- Register an user
- Edit the user profile
- Change password
- Unregister an User
- Publish an interpretation
- Explore personalized interpretations connecting with the Spotify user account
- Search interpretations of an Artist or a Song
- Rate an interpretation
- Update an interpretation rate
- Remove an interpretation rate

### Wireframes

## Technical Description

## Create Interpretations
PitchUs allows users to publish their interpretations of songs just writing a simple string. Using a database and a regex, the app detect the chords along the string and offer the possibility to see how the chords can be played using an interface provided by react-chords library develop by @tombatossals.

The user that creates a new interpretation can choose an artist or a song already interpreted by other user, or can create new artists and songs.

### Spotify Integration
PitchUs has an integration with Spotify-API that allow users to provide their data to the application. PitchUs uses this information to take the favorite artists of the user and offering access to their interpretations in the home page. The Spotify session is save in the database, so the user could have a personalized activity no matter the navigator or device they are using.

### Search
The search functionality was develop to retrieve all the songs and artist that matches with the query tiped by the user. To do do that a regex was used in MongoDB.

### Rating
The application also offers the possibility to rate the interpretations of others users and change o modify a previous rate.

### Server Side Rendering
PitchUs runs on Next.js. We decide to use this technology to make the application more appropiate to be indexed for SEO in order to be scalable.

## Technologies
- React
- NextJS
- Tailwind
- Express
- MongoDB

### Data Model

#### User
- id (ObjectId)
- email (String)
- username (String)
- password (String)
- firstName (String)
- LastName (String)
- dateOfBirth (Date)
- spotifySession (Object)
- image - TODO

#### Artist
- id (ObjectId)
- name (String)
- genres (Array of Numbers)
- country (String)
- image - TODO

#### Song
- id (ObjectId)
- artist (ObjectId)
- name (String)
- genres (Array of Numbers)
- album (String)
- Date (Date)
- interpretations ([Interpretation])

#### Interpretation
- id (ObjectId)
- user (ObjectId)
- ranks ([Rank])
- date (Date)
- content (String)
- comments ([Comment]) - TODO

#### Rank
- id (ObjectId)
- user (ObjectId)
- amount (Number)

#### Comment - TODO
- id (ObjectId)
- user (ObjectId)
- text (String)
- date (Date)
- like (Array of ObjectId)