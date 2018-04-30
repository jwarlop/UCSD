
#1a - Display the first and last names of all actors from the table `actor`. 
use sakila;
SELECT first_name,last_name from actor;

#1b
USE sakila;
ALTER TABLE actor
ADD COLUMN `Actor Name`  VARCHAR(25) AFTER last_name;
SET SQL_SAFE_UPDATES = 0;
UPDATE sakila.actor SET `Actor Name` = CONCAT(first_name,' ',last_name);
SET SQL_SAFE_UPDATES = 1;

# 2a - Find all actors whose last name contain the letters `GEN` 
USE sakila;
SELECT  actor_id, first_name,last_name 
FROM sakila.actor 
WHERE first_name='Joe';

# 2b - Find all actors whose last name contain the letters `GEN`
USE sakila;
SELECT actor_id,first_name,last_name 
FROM actor WHERE  locate('GEN',last_name) > 0;


#2c - Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:
SELECT actor_id, first_name, last_name 
FROM sakila.actor 
WHERE locate('LI',last_name) > 0 
ORDER BY last_name,first_name ASC;


# 2d - Using `IN`, display the `country_id` and `country` columns of the following
# countries: Afghanistan, Bangladesh, and China
SELECT country_id, country 
FROM  sakila.country 
WHERE country 
IN ('Afghanistan', 'Bangladesh', 'China');


# 3a - Add middle_name column
USE sakila; 
ALTER TABLE sakila.actor
ADD  `middle_name`  
VARCHAR(25) AFTER first_name;


#3b - change middle_name to blob
USE sakila;
ALTER TABLE actor 
MODIFY middle_name BLOB;


#3c - delete middle_name column
USE sakila;
ALTER TABLE actor 
DROP middle_name;
DESC actor;


#4a - List last name of actors and how many have that last name
USE sakila;
SELECT COUNT(actor_id), last_name 
FROM sakila.actor 
GROUP BY last_name;


# 4b - List last names of actors and the number of actors who have that last name, 
# but only for names that are shared by at least two actors
USE sakila;
SELECT COUNT(actor_id)  , last_name 
FROM sakila.actor 
GROUP BY last_name 
HAVING count(actor_id) >  1 ;

# 4c - Oh, no! The actor `HARPO WILLIAMS` was accidentally entered in the
# `actor` table as `GROUCHO WILLIAMS`, the name of Harpo's second cousin's
# husband's yoga teacher. Write a query to fix the record.
USE sakila;
SELECT actor_id, last_name,first_name 
FROM actor 
WHERE last_name = 'WILLIAMS' and first_name = 'GROUCHO';
UPDATE actor SET first_name = 'HARPO'  WHERE actor_id = 172;


# 4d - Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the 
# correct name after all! In a single query, if the first name of the actor is currently `HARPO`, change it to `GROUCHO`.
# Otherwise, change the first name to `MUCHO GROUCHO`, as that is exactly what the actor will be with the grievous
# error. BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO `MUCHO GROUCHO`, 
# HOWEVER! (Hint: update the record using a unique identifier.)'
USE sakila;
UPDATE actor
SET first_name = 
CASE
  WHEN first_name = 'HARPO' 
		THEN  'GROUCHO'
  ELSE first_name 
END where first_name = 'HARPO' LIMIT 1;


#5a - Recreate schema for address table
USE sakila;
SHOW CREATE TABLE address;
desc sakila.address;



# 6a - Use `JOIN` to display the first and last names, as well as the address, 
# of each staff member. Use the tables `staff` and `address`
USE sakila;
SELECT staff.first_name, staff.last_name,address.address 
FROM staff
INNER JOIN ADDRESS ON staff.address_id = address.address_id;


# 6b - Use `JOIN` to display the total amount rung up by each staff member
# in August of 2005. Use tables `staff` and `payment`. 
USE sakila;
SELECT SUM(payment.amount) AS 'Total Payments' , staff.first_name AS 'First',staff.last_name AS 'Last' 
FROM staff 
INNER JOIN payment ON staff.staff_id = payment.staff_id 
WHERE payment.payment_date >=   '2005-08-01' 
AND payment.payment_date < '2005-09-01' 
GROUP BY staff.staff_id;


# 6c - List each film and the number of actors who are listed for that film. Use tables
# `film_actor` and `film`. Use inner join.
USE sakila;
SELECT count(film_actor.actor_id) 
AS 'Actor Count',film.title 
AS 'Title'  
FROM film
INNER JOIN film_actor ON film.film_id = film_actor.film_id
GROUP BY film_actor.film_id;


# 6d - How many copies of the film `Hunchback Impossible` 
# exist in the inventory system?
USE sakila;
SELECT count(inventory_id) FROM inventory 
WHERE inventory.film_id = 
(SELECT film_id FROM film WHERE film.title='Hunchback Impossible');


# 6e - Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer.
# List the customers alphabetically by last name:
USE sakila;
SELECT customer.first_name,customer.last_name,sum(payment.amount) 
FROM customer 
INNER JOIN payment ON customer.customer_id = payment.customer_id
GROUP BY customer.customer_id ORDER BY customer.last_name ASC;


# 7a - The music of Queen and Kris Kristofferson have seen an unlikely resurgence. 
# As an unintended consequence, films starting with the letters `K` and `Q` have also soared in
# popularity. Use subqueries to display the titles of movies starting with the letters `K` and `Q` 
# whose language is English.
USE sakila;
SELECT film.title 
FROM film 
WHERE film.title LIKE 'Q%'  OR film.title LIKE 'K%'AND film.language_id = 
(SELECT language.language_id 
FROM language 
WHERE language.name = 'English');


# 7b - Use subqueries to display all actors who appear in the film `Alone Trip`
USE sakila;
SELECT actor.first_name,actor.last_name 
FROM actor 
WHERE actor_id IN 
(
	SELECT actor_id 
    FROM film_actor 
    WHERE film_id = 
	(
		SELECT film_id 
        FROM film 
        WHERE film.title = 'Alone Trip'
	)
);



# 7c - You want to run an email marketing campaign in Canada, for which you will need the names and 
# email addresses of all Canadian customers. Use joins to retrieve this information.
USE sakila;
SELECT email 
FROM customer 
WHERE customer.address_id IN 
	(
		SELECT address_id 
        FROM address 
        WHERE address.city_id IN
			(
				SELECT city_id 
				FROM city 
				INNER JOIN country  ON country.country_id = city.country_id 
				WHERE country.country = 'Canada'
            ) 
	);
    
    

# 7d - Sales have been lagging among young families, and you wish to target all family movies for a promotion. 
# Identify all movies categorized as famiy films.
USE sakila;
SELECT title 
FROM film 
WHERE film_id IN
(
	SELECT film_id 
	FROM film_category 
	WHERE film_category.category_id = 
	(
		SELECT category_id 
		FROM category 
		WHERE name = 'Family'
	)
);


# 7e - Display the most frequently rented movies in descending order.
USE sakila;
(SELECT F.title AS 'Title',YY.count AS `Rental Count` From film F
INNER JOIN
(
		SELECT sum(XX.count) AS 'count',XX.film_id AS 'film_id'
		FROM 
		(
				SELECT I.inventory_id,RR.count AS 'count' , I.film_id AS 'film_id' 
                FROM inventory I  
				INNER JOIN
				(
						SELECT count(R.rental_id) AS 'count' , R.inventory_id AS 'inventory_id' 
                        FROM rental R 
						GROUP BY R.inventory_id 
				) RR ON I.inventory_id = RR.inventory_id
		) XX GROUP BY XX.film_id
) YY ON F.film_id = YY.film_id) ORDER BY count DESC;



# 7f - Write a query to display how much business, in dollars, each store brought in.
USE sakila;
SELECT S.staff_id AS 'store', PP.sales FROM staff S
INNER JOIN
(
		SELECT P.staff_id AS 'staff_id' ,sum(P.amount) AS 'sales' 
        FROM payment P  
        GROUP BY P.staff_id 
) PP on S.staff_id = PP.staff_id;


# 7g - Write a query to display for each store its store ID, city,
# and country.
USE sakila;
SELECT CX.store_id,CO.country,CX.city 
FROM country CO
INNER JOIN
(
	SELECT C.city_id,C.city,C.country_id,SA.store_id  
    FROM  city C
	INNER JOIN
	(
		SELECT S.store_id AS 'store_id' ,AA.address_id,AA.city_id 
        FROM store S 
		INNER JOIN
		(
			SELECT A.address_id,A.city_id 
            FROM address A
		) AA ON S.address_id = AA.address_id
	) SA ON C.city_id = SA.city_id
) CX ON CO.country_id = CX.country_id;


# 8a - In your new role as an executive, you would like to have an
# easy way of viewing the Top five genres by gross revenue. 
# Use the solution from the problem above to create a view.
# If you haven't solved 7h, you can substitute another query to
# create a view.'
USE sakila;
CREATE VIEW top_5_genres AS
SELECT C.name AS 'genre',PX.revenue 
FROM category C
INNER JOIN
(
	SELECT sum(P.amount) AS 'revenue',PP.category_id FROM payment P 
	INNER JOIN
	(
		SELECT FC.film_id,FC.category_id,CX.rental_id FROM film_category FC
		INNER JOIN
		(
			SELECT R.rental_id, R.inventory_id,RI.film_id 
            FROM rental R
			INNER JOIN
			(
				SELECT I.film_id,I.inventory_id 
				FROM inventory I
			) RI ON R.inventory_id = RI.inventory_id
		) CX on FC.film_id = CX.film_id
	) PP ON P.rental_id = PP.rental_id GROUP BY PP.category_id
) PX ON C.category_id = PX.category_id ORDER BY revenue DESC LIMIT 5;

# 8b - How would you display the view that you created in 8a?
SELECT * FROM top_5_genres;

# 8c - You find that you no longer need the view `top_5_genres`. 
# Write a query to delete it.
DROP VIEW top_5_genres;



