\c rated_restaurants;

INSERT INTO areas
    (area_name)
VALUES
    ('Northern Quarter'),
    ('Spinningfields'),
    ('Ancoats');


INSERT INTO restaurants
  (restaurant_name, area_id, cuisine, website)
VALUES
  ('Luck Lust Liquor & Burn', 1, 'Mexican', 'http://lucklustliquorburn.com/'),
  ('The Oast House', 2, 'Gastropub and Grill', 'http://theoasthouse.uk.com/'),
  ('Rudys Pizza', 3, 'Neapolitan Pizzeria', 'http://rudyspizza.co.uk/'),
  ('This & That', 1, 'Family Run Indian Curryhouse', 'http://www.thisandthatcafe.co.uk/'),
  ('Pieminister', 1, 'Pies and More Pies', ''),
  ('Australasia', 2, 'Australasian Cuisine', 'http://australasia.uk.com/'),
  ('Delhi 2 go', 1, 'Late night food', 'http://delhi2go-online.co.uk/'),
  ('Vivid Lounge', 3, 'Chic Thai Eatery', 'http://www.vividlounge.uk/');

INSERT INTO ratings
  (restaurant_id, rating)
VALUES
  (1, 5),
  (2, 4),
  (3, 5),
  (4, 4),
  (5, 1),
  (6, 4),
  (7, 5),
  (8, 4),
  (1, 2),
  (2, 4),
  (2, 5),
  (4, 4),
  (7, 5),
  (8, 4),
  (1, 2),
  (3, 4),
  (7, 5),
  (8, 1),
  (1, 5),
  (2, 4),
  (8, 5),
  (7, 4),
  (6, 1),
  (1, 4),
  (2, 5),
  (3, 4),
  (4, 2),
  (5, 4),
  (8, 5),
  (7, 4),
  (6, 5),
  (5, 4),
  (4, 2),
  (3, 4),
  (2, 5),
  (1, 1);
