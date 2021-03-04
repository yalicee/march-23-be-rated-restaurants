# Rated Restaurants

## A micro [yelp](https://www.yelp.co.uk/c/manchester/restaurants) clone API using Express and SQL

### Background

We are going to build an API which shows ratings, comments and cuisine for restaurants in the Greater Manchester area.
For this Sprint we will be using [PostgreSQL](https://www.postgresql.org/) and [node-postgres](https://node-postgres.com/).

### W3 Schools

When we are looking for in depth knowledge on JavaScript we tend to use MDN - W3 Schools is a very good resource for referencing and learning SQL. [Here is the link](http://www.w3schools.com/sql/default.asp)

## Seeding Challenges

### 1. Create a restaurants database

### 2. Create tables

#### Areas Table

| area_id            | name    |
| ------------------ | ------- |
| SERIAL PRIMARY KEY | VARCHAR |

Areas `have many` Restaurants

#### Restaurants Table

| restaurant_id      | name    | area_id                  | cuisine | website |
| ------------------ | ------- | ------------------------ | ------- | ------- |
| SERIAL PRIMARY KEY | VARCHAR | INT REFERENCES Areas(id) | VARCHAR | VARCHAR |

Restaurants `have many` Comments

#### Comments Table

| comment_id         | restaurant_id                  | body    | created_at                                   |
| ------------------ | ------------------------------ | ------- | -------------------------------------------- |
| SERIAL PRIMARY KEY | INT REFERENCES Restaurants(id) | VARCHAR | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP |

Restaurants also `have many` Ratings

#### Ratings Table

The rating must be an integer with a minimum value of one and a maximum value of five. Research how to make this a constraint in your Table

| rating_id          | restaurant_id                  | rating  | created_at                                   |
| ------------------ | ------------------------------ | ------- | -------------------------------------------- |
| SERIAL PRIMARY KEY | INT REFERENCES Restaurants(id) | INTEGER | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP |

Ratings and Comments both belong to restaurants but have no relationship with each other. A Comment or Rating also does not need to know which Area the Restaurant it `belongs to` is in.

### 3. Insert information into tables

Insert data into your tables. Either use the [example-data.md](./example-data.md) or create your own.

## API challenges

Now that we have our database containing our data, we can start to build our server to interact with our data.

For each of the following endpoints, first write a test using `supertest` and then implement the endpoint.

**After your lecture on Day 2, make sure to go back to previous endpoints and add any error handling you can think of - testing first and then implementing.**

### 1. GET /api

This endpoint should respond with a json object containing a 'message' key

```json
{
  "message": "all ok"
}
```

### 2. GET /api/restaurants

This endpoint should respond with a json object containing a key of `restaurants` with a value of an array of all the restaurant objects.

E.g.

```json
{
  "restaurants": [
    // ... restaurant objects
  ]
}
```

### 3. GET /api/restaurants?search=<searchTerm>

Update the above endpoint to allow a `search` query which will filter the results for any restaurant names that match, or partially match, the search term.

**Hint:** - Implement this filtering in your SQL query rather than JavaScript.

E.g.

```json
// GET /api/restaurants?search=pi
{
  "restaurants": [
    // Rudys Pizza restaurant object,
    // Pieminister restaurant object
  ]
}
```

### 4. POST /api/restaurants

This endpoint should add a restaurant to the database and respond with newly created restaurant

```json
// POST /api/restaurants - example request body:

{
  "restaurant_name": "The Codfather",
  "area_id": 2,
  "cuisine": "British",
  "website": "www.thecodfather.com"
};
```

```json
// Example response:
{
  "restaurant": {
    "restaurant_id": 9,
    "restaurant_name": "The Codfather",
    "area_id": 2,
    "cuisine": "British",
    "website": "www.thecodfather.com"
  }
}
```

### 5. DELETE /api/restaurants/:restaurant_id

This endpoint should delete the specified restaurant from the database and respond with a 204 No Content status.

### 6. PATCH /api/restaurants/:restaurant_id

This endpoint should be able to update the specified restaurant. It should accept a body containing any number of the following keys: `restaurant_name`, `area_id`, `cuisine` and `website`, and ignore any other keys. It should respond with the updated restaurant object.

```json
// PATCH /api/restaurants/3 - example request body:

{
  "area_id": 2,
  "website": "http://rudyspizza-NQ.co.uk/"
};
```

```json
// Example response:
{
  "restaurant": {
    "restaurant_id": 3,
    "restaurant_name": "Rudys Pizza",
    "area_id": 2,
    "cuisine": "Neapolitan Pizzeria",
    "website": "http://rudyspizza-NQ.co.uk/"
  }
}
```

### 7. GET /api/areas/:area_id/restaurants

This endpoint should respond with a json object with the area details, containing a count of the restaurants in that area and an array of those restaurants.

```json
// GET /api/areas/1/restaurants
{
  "area_id": 1,
  "name": "Northern Quarter",
  "total_restaurants": 4,
  "restaurants": [
    //  ... area 1 restaurants
  ]
}
```

### 8. GET /api/restaurants

Update the existing endpoint so that each restaurant object has an `average_rating` property.

## Even More Challenges

### 9. GET /api/restaurants?sort_by=<sortByCriteria>

This endpoint should be able to take a sort_by query that will sort the restaurants by the specified criteria, including rating. If no sort_by is specified, the sort should default to sorted alphabetically by name, descending.

```json
// GET /api/restaurants?sort_by=rating
{
  "restaurant": [
    // restaurant objects sorted by rating, descending order
  ]
}
```

## More

4 - Add a comment to a restaurant
returns a json object containing an object of the new comment

```js
POST /api/restaurants/12/comments
{
  comment: {
    comment_id: 57,
    restaurant_id: 12,
    body: 'What a place! Delicious food and even better service!',
    created_at: 961977633210
  }
}
```

5 - Get comments for a restaurant
returns a json object of the restaurant, containing a total count and an array of comments for the restaurant

```js
GET /api/restaurants/12/comments
{
    restaurant_id: 12,
    area_id: 3,
    name: 'Carluccio’s',
    cuisine: 'Italian',
    website: 'http://www.carluccios.com/'
    total_comments: 2,
    comments: [
        {
          comment_id: 312,
          restaurant_id: 12,
          body: 'My partner found this place on twitter so we decided to go have a look...',
          created_at: 961027220321
        },
        {
          comment_id: 422,
          restaurant_id: 12,
          body: 'The place is quirky and affordable - I paid less than 5 pounds for a...',
          created_at: 964224128725
        }
    ]
}
```

6 - Add a rating to a restaurant
returns a json object containing an object of the new rating

```js
POST /api/restaurants/12/ratings
{
  rating: {
    rating_id: 55,
    restaurant_id: 12,
    rating: 4,
    created_at: 961977633210
  }
}
```

7 - Get ratings for a restaurant
returns a json object of the restaurant, containing a total count and an array of ratings for the restaurant

```js
GET /api/restaurants/12/ratings
{
    restaurant_id: 12,
    area_id: 3,
    name: 'Carluccio’s',
    cuisine: 'Italian',
    website: 'http://www.carluccios.com/'
    total_ratings: 2,
    ratings: [
        {
          rating_id: 32,
          restaurant_id: 12,
          rating: 5,
          created_at: 961977633210
        },
        {
          rating_id: 47,
          restaurant_id: 12,
          rating: 2,
          created_at: 963964815076
        }
    ]
}
```

### Testing Steps

1.  Write tests for each of your API endpoints
2.  Write tests for non-existing routes, you should respond with an appropriate error code and message.
3.  Write tests for bad user inputs on valid routes:
    GET requests for id's that do not exist should return a 404.
    POST requests with invalid data should return a 400.

### Extra credit tasks

1.  Add a `sort_by` query to sort your restaurants by rating, most recently rated, most commented or most recently commented.
2.  Extend your restaurants controller to serve an average rating and a comments count.
3.  Write a route and controller for getting the average ratings across an area.

```
GET /api/areas/:area_id/average-rating
```

4.  Extend your areas route and controller to use a `sort_by` query to list the areas by the highest to lowest average rating.

```
GET /api/areas?sort_by=average_rating
```

5. Ensure that any bad routes, quereis, POST bodies or bad IDs are handled by some [https://expressjs.com/en/guide/error-handling.html](https://expressjs.com/en/guide/error-handling.html).
