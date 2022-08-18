# PitchUs

## Intro

![](https://media.giphy.com/media/3o72EX5QZ9N9d51dqo/giphy.gif)

PitchUs is a social media for musicians who want to play and share song interpretations. It is created to encourage musicians to interact with each other and have the freedom to publish their interpretations with fewer restrictions.

Deployed version of app is available [here](https://pitch-us.vercel.app)

Deployed version of API is available in Heroku (https://pitch-us-api.herokuapp.com/api)

## Disclaimer

- In this version, Spotify connection and authentication with Google provider are still in development phase. So that, who wants to try it, should be send me an email to federico.lopezeikili@gmail.com to be included in test users list.

- Only mobile styles are available for now. 

## Funcional Description

### Use Cases
- Publish an interpretation
- Explore personalized interpretations connecting with the Spotify user account
- Explore most recent interpretations published by users followed
- Explore most visited interpretations
- Explore most visited artists
- Search interpretations filtering by artist or song
- Search users
- Follow or unfollow users
- Rate an interpretation
- Update an interpretation rate
- Remove an interpretation rate

## Technical Description

### Create Interpretations
PitchUs allows users to publish their interpretations of songs just writing a simple string. Using a database and a regex, the app detect the chords along the string and offer the possibility to see how the chords can be played using an interface provided by react-chords library develop by @tombatossals.

The user that creates a new interpretation can choose an artist or a song already interpreted by other user, or can create new artists and songs.

### Spotify Integration
PitchUs has an integration with Spotify-API that allow users to provide their data to the application. PitchUs uses this information to take the favorite artists of the user and offering access to their interpretations in the home page. The Spotify session is save in the database, so the user could have a personalized activity no matter the navigator or device they are using.

### Search
The search functionality was develop to retrieve all the songs, artists and users that matches with the query tiped by the user

### Rating
The application also offers the possibility to rate the interpretations of others users and change o modify a previous rate.

### Follow users
A logged in user is allowed to 'follow' other users so the home page shows the last recent interpretations published by these users.

### Server Side Rendering
PitchUs runs on Next.js. We decide to use this technology to make the application more appropiate to be indexed for SEO.

## Technologies
- React
- NextJS
- Tailwind
- Express
- MongoDB - aggregation framework
- NextAuth 

### Data Model

#### User
- id (ObjectId)
- email (String)
- username (String)
- password (String)
- provider (Object)
- firstName (String)
- LastName (String)
- dateOfBirth (Date)
- spotifySession (Object)
- following (Array of ObjectId - users)
- followers (Array of ObjectId - users )
- profileImage (String - firebase url)

#### Artist
- id (ObjectId)
- name (String)
- genres (Array of Numbers)
- country (String)
- visits (Number)

#### Song
- id (ObjectId)
- artist (ObjectId)
- name (String)
- genres (Array of Numbers)
- album (String)
- Date (Date)

#### Interpretation
- id (ObjectId)
- user (ObjectId)
- artist (ObjectId)
- ranks (Array of ranks)
- date (Date)
- content (String)
- visits (Array of Dates)
- comments (Array of comments)

#### Rank
- id (ObjectId)
- user (ObjectId)
- amount (Number)

#### Comment
- id (ObjectId)
- user (ObjectId)
- text (String)
- date (Date)
- likes (Array of ObjectId - users)