# Rated Restaurants

## A micro [yelp](https://www.yelp.co.uk/c/manchester/restaurants) clone API using Express and SQL

### Background

We are going to build an API which shows ratings, comments and cuisine for restaurants in the Greater Manchester area.
For this Sprint we will be using [PostgreSQL](https://www.postgresql.org/) and [pg-promise](https://www.npmjs.com/package/pg-promise).

### W3 Schools

When we are looking for in depth knowledge on JavaScript we avoid W3 Schools like the plague! W3 Schools is in-fact a very good resource for referencing and learning SQL. [Here is the link](http://www.w3schools.com/sql/default.asp)

### Goals

1.  Build up SQL schemas to create the tables for your database.
2.  Learn more about queries written in SQL.
3.  Make post requests and validate your data before it fails your schema.
4.  Solidify your knowledge of building and writing tests for APIs.
5.  Learn how to manage SQL migrations as we cannot just DROP the database when we need to alter it!

### Steps

1.  We will need database schemas to create the tables
2.  A SEED file to put some development data into your database
3.  Router for the API
4.  Controllers for each route
5.  Write a Query for each data set you will require. We would usually export this from a `lib` directory in a `queries.js` file
6.  Connect to your database with the pg-promise library
7.  Return or insert/update the data required for each route as described below.
8.  On day 2 - Retroactively add tests to your routes and then continue with a TDD approach.

### Postgresql commands

USE database_name;

```
\c database_name
```

SHOW TABLES;

```
\dt
```

SHOW DATABASES;

```
\l
```

EXIT CONSOLE;

```
\q
```

### Schema breakdown

##### Areas Schema

```
     area_id       |    name     |
-------------------+-------------+
SERIAL PRIMARY KEY |   VARCHAR   |
```

Areas `have many` Restaurants

##### Restaurants Schema

```
   restaurant_id   |    name     |                  area_id                   |    cuisine     |  website  |
-------------------+-------------+--------------------------------------------+----------------+-----------+
SERIAL PRIMARY KEY |   VARCHAR   | FOREIGN KEY (area_id) REFERENCES Areas(id) |    VARCHAR     |  VARCHAR  |
```

Restaurants `have many` Comments

##### Comments Schema

```
    comment_id     |                     restaurant_id                      |      body     |            created_at               |
-------------------+--------------------------------------------------------+---------------+-------------------------------------+
SERIAL PRIMARY KEY | FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id) |    VARCHAR    |  TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP |
```

Restaurants also `have many` Ratings

##### Ratings Schema

The rating must be an integer with a minimum value of one and a maximum value of five. Research how to make this a constraint in your schema

```
     rating_id     |                     restaurant_id                      |    rating     |            created_at               |
-------------------+--------------------------------------------------------+---------------+-------------------------------------+
SERIAL PRIMARY KEY | FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id) |    INTEGER    | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP |
```

Ratings and Comments both belong to restaurants but have no relationship with each other. A Comment or Rating also does not need to know which Area the Restaurant it `belongs to` is in.

### API Breakdown

#### Our API will need the following routes:

1 - Get areas
returns a json object of areas keyed by their id

```
GET /api/areas
{
    1: {
        area_id: 1,
        name: 'Altrincham'
    },
    2: {
        area_id: 2,
        name: 'Northern Quarter'
    }
}
```

2 - Get restaurants for a area
returns a json object with the area, containing a json object of restaurants keyed by their restaurant_id

```
GET /api/areas/:area_id/restaurants
{
    area_id: 3,
    name: 'Picadilly',
    restaurants: {
        12: {
            restaurant_id: 12,
            area_id: 3,
            name: 'Carluccio’s',
            cuisine: 'Italian',
            website: 'http://www.carluccios.com/'
        },
        21: {
            restaurant_id: 21,
            area_id: 3,
            name: 'Yo! Sushi',
            cuisine: 'Sushi',
            website: 'https://yosushi.com/restaurants/Manchester-Piccadilly-station'
        },
    }
}
```

3 - Add a restaurant to an area

```
POST /api/areas/:area_id/restaurants
```

4 - Get comments for a restaurant
returns a json object of the restaurant, containing a json object of comments keyed by their id

```
GET /api/restaurants/12/comments
{
    restaurant_id: 12,
    area_id: 3,
    name: 'Carluccio’s',
    cuisine: 'Italian',
    website: 'http://www.carluccios.com/'
    comments: {
        312: {
            comment_id: 312,
            restaurant_id: 12,
            body: 'My partner found this place on twitter so we decided to go have a look...',
            created_at: 961027220321
        },
        422: {
            comment_id: 422,
            restaurant_id: 12,
            body: 'The place is quirky and affordable - I paid less than 5 pounds for a...',
            created_at: 964224128725
        },
    }
}
```

5 - Get ratings for a restaurant
returns a json object of the restaurant, containing a json object of ratings keyed by their id

```
GET /api/restaurants/12/ratings
{
    restaurant_id: 12,
    area_id: 3,
    name: 'Carluccio’s',
    cuisine: 'Italian',
    website: 'http://www.carluccios.com/'
    ratings: {
        32: {
            rating_id: 32,
            restaurant_id: 12,
            rating: 7,
            created_at: 961977633210
        },
        47: {
            rating_id: 47,
            restaurant_id: 12,
            rating: 6,
            created_at: 963964815076
        },
    }
}
```

6 - Add a comment to a restaurant

```
POST /api/restaurants/12/comments
```

7 - Add a rating to a restaurant

```
POST /api/restaurants/12/ratings
```

### Day 2 Tasks

### Testing Steps

1.  Write tests for each of your API endpoints
2.  Write tests for non-existing routes, you should respond with an appropriate error code and message.
3.  Write tests for bad user inputs on valid routes:
    GET requests for id's that do not exist should return a 404.
    POST requests with invalid data should return a 400.

### Extra credit tasks

1.  Extend your restaurants controller to serve an average rating and a comments count.
2.  Add a query to sort your restaurants by rating, most recently rated, most commented or most recently commented.
3.  Write a route and controller for getting the average ratings across an area.

```
GET /api/areas/:area_id/average-rating
```

4.  Extend your areas route and controller to list the areas by the highest to lowest average rating.

```
GET /api/areas?sort-by=average-rating
```
