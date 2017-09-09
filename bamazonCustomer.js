// npm- necessary for this to work: mysql, inquirer, cli-table stored in variables
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');//uppercase b/c npm cli-table uses it like this

// creates a connection to MySQL database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // your username
    user: 'root',

    // your password and the database you would like to connect to
    password: '12345678',
    database: 'bamazon'
});

// status and error handling for database connection
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    start();
});


// performs inital query of Products table from database
var start = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        console.log('---------------------------------');
        console.log('Available Bamazon Products');
        console.log('---------------------------------');
        // New Table instance to format returned sql data
        var table = new Table({
            head: ['item_id', 'product_name', 'price', 'quantity'],
            colWidths: [10, 70, 10, 10]
        });
        for (var i=0; i < res.length; i++) {
            var productArray = [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity];
            table.push(productArray);
        }
        console.log(table.toString());
        buyItem();
    });
};

//Prompts the customer on which item to buy
var buyItem = function() {
    inquirer.prompt([{
        name: "Item",
        type: "input",
        message: "Enter the ID of the Item you would like to buy",
        validate: function(value) {
            //validates answer
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter only the Item number of the item you'd like to buy rn\n");
                return false;
            }
        }
    }, {//Prompts the customer for the quantity
        name: "Qty",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
            //validates answer
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter a valid Quantity\n");
                return false;
            }
        }
    }]).then(function(answer) {
        var ItemInt = parseInt(answer.Qty);
        //Queries the database
        connection.query("SELECT * FROM products WHERE ?", [{item_id: answer.Item}], function(err, data) {
            if (err) throw err;
            //Checks if sufficient quantity exists
            if (data[0].stock_quantity < ItemInt) {
                console.log("We're sorry, that Item is limited to stock quantity: " + data[0].stock_quantity);
                console.log("Please choose another product\n");
                start();
            } else {
                //if quantity exists updates database
                var updateQty = data[0].stock_quantity - ItemInt;
                var totalPrice = data[0].price * ItemInt;
                connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [updateQty, answer.Item], function(err, results) {
                    if(err) {
                        throw err;
                    } else {
                        console.log("Your purchase was successful!\n");
                        console.log("Your total cost is: $ " + totalPrice);
                        //Asks the buyer if they would like to continue
                        inquirer.prompt({
                            name: "buyMore",
                            type: "confirm",
                            message: "Would you like to make another purchase?",
                        }).then(function(answer) {
                            if (answer.buyMore === true) {
                                start();
                            } else {
                                console.log("Bamazon thanks you for your capitalist tender!");
                                connection.end();
                            }
                        });
                    }
                });
            }
        });
    });
};



