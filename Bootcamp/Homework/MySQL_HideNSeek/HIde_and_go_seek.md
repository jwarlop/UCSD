# Hide and Go Seek

## Instructions

* Start by using the Table Import Wizard to create a new table based upon the data stored within `WordAssociation-AC.csv`.

    * Come up with a means to add a new column to this table that will act as an "ID" column. This column should act as the primary key and auto-increment. By doing this, each row will now have a unique ID.

    * Import the values stored within `WordAssociation-BC.csv` and `WordAssociation-CC.csv` into the table created. This can take some time, so look through the CSV files or read through some [MySQL tutorials](https://www.w3schools.com/sql/) whilst waiting.

    * Create a query that collects all of the rows whose "source" is "AC"

    * Create a query that collects all of the rows whose "source" is "BC"

    * Create a query that collects all of the rows whose "source" is "CC"

    * Create a query that collects all of the rows whose author is within the range of 0-20

    * Create a query that searches for any rows that have "pie" in their "word1" or "word2" columns

* **Bonus**:

    * There are some functions in MySQL that allow users to perform simple calculations like `MIN()`, `MAX()`, `COUNT()`, `AVG()`, and `SUM()`. Look some of these funcions up and then perform the following calculations...

    * Find the total number of records within the data table using the `COUNT()` function

    * Find the lowest "ID" for those rows with a "source" of "CC"

    * Count how many rows have an "author" of 12
