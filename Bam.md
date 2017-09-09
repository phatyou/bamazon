**Bamazon**

* Bamazon is a Node application which allows users to select from a list of available items, and, if there is sufficient quantity for that item, to purchase the item.

  * The basic application is fairly simple: Upon loading up the program, the Bamazon database (product table) is printed/consoled (via npm mySQL connection and npm cli-table), and the user is prompted to enter the ID number for whichever item they would like to buy.

    * If the user selects an item by ID, the input is validated, and they are prompted for how many units they want to buy.

    * The quantity the user entered is compared against the mySQL Bamazon database (product table) for stock-quantity.
        * If the quantity the user entered is lower than the stock held in the database, then the purchase proceeds and the total price is consoled to the user.  
            * The database is updated at the time the purchase "goes through" (if the condition is met that there is enough stock of the product to buy).  The quantity is updated. 
        * If the quanity is less than stock in database, then the user is informed of the failure and boots them back to the selection screen.
        * If the quantity the user entered is higher than the stock_quantity, the user is told that the product is out of stock.
            * The database is not updated as no purchase took place. (Would be nice if a message was sent to the manager that product stock should be evaluated. File under "Nice-to-haves".)

    * The user is then prompted if they would like to quit/end their session, or if they would like to keep shopping.
        * If user selects keep shopping, then the initial function is called that displays the products.
        * If user selects quit, then the user is shown a leave-taking message and the connection in terminated.

    Things that would/could be cool in later versions:
    * Create a sign up and login system that prompts users for a username and password upon loading up the app.
    
    * Augment the database with a description of the item.
    
    * Create a system which allows users to write a review of an item. 
    
    * Create an option on the main screen which allows administrators to modify the database as they see fit.
