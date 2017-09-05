* Bamazon is a Node application which allows users to select from a list of items available, and, if there is sufficient quantity for that item, to purchase the item.


  * The basic application is fairly simple: Upon loading up the program, the Bamazon database (product table) is printed/consoled (via npm mySQL connection), and the user is prompted to select which item they would like to buy.

    * If the user selects an item, they are prompted for how many units they want to buy.

    * The quantity the user entered is compared against the mySQL Bamazon database (product table).
        * If the quantity the user entered is lower than (or equal to) the stock held in the database, then the purchase proceeds and the total price is consoled to the user.  
            * The database is updated at the time the purchase "goes through" (if the condition is met that there is enough stock of the product to buy).  The quantity is updated and the total sales by item/department are also updated. (Partial Manager functionality). 
        * If the quanity is less than stock in database, then the user is informed of the failure and boots them back to the selection screen (with an apologetic message).
            * The database is not updated as no purchase took place. (Would be nice if a message was sent to the manager that product stock should be evaluated. File under "Nice-to-haves".)

    * The user is then prompted if they would like to quit/end their session, or if they would like to keep shopping.
        * If user selects keep shopping, then the shop function in called.
        * If user selects quit, then the user is shown a leave-taking message and the connection in terminated.

    * Create a sign up and login system that prompts users for a username and password upon loading up the app. **Do not worry about setting up a truly secure database if you choose to tackle this addon. Just worry about building working sign up and login features.**

    * Create a system which allows users to write a review of an item. 
    
    * Create an option on the main screen which allows administrators to modify the database as they see fit.

    * Create visually appealing tables. This means making dynamic console code and it is a lot harder than it might seem at first so do not think this one is so simple.