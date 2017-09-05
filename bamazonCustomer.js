var mysql = require("mysql");
var inquirer = require("inquirer");
// var password = require("./password");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "12345678",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log('Welcome to Bamazon!');
    buyStuff();
});

var buyStuff = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        //Presents user with a list of items available for purchase. Loops through the products
        //table and pushes items into the productsArray.
        inquirer.prompt({
            name: "products",
            type: "list",
            choices: function(value) {
                var productsArray = [];
                for (var i = 0; i < res.length; i++) {
                    productsArray.push(res[i].product_name);
                }
                return productsArray;
            },
            message: "Which product you would like to buy?"
        }).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                //Finds a match with the user's answer...
                if (res[i].product_name === answer.products) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many units would you like to buy?"
                    }).then(function(answer) {
                        //if insufficient stock, prompts user to try again
                        if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                            console.log("Sorry, we only have " + chosenItem.stock_quantity + " of those in stock.");
                            buyStuff();
                            //if sufficient product, allows user to purchase item(s). Updates products table
                        } else {
                            var total = chosenItem.price * parseInt(answer.quantity);

                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity),
                                product_sales: chosenItem.product_sales + total
                            }, {
                                item_id: chosenItem.item_id
                            }], function(err, res) {

                            });
                            //updates departments table with the current sale, using department_name as the common field
                            connection.query("SELECT total_sales,department_name FROM departments", function(err, res) {
                                    for (var i = 0; i < res.length; i++) {
                                        if (res[i].department_name === chosenItem.department_name) {
                                            var prevTotal = res[i].total_sales;
                                            var sumSales = prevTotal + total;
                                            var departmentName = chosenItem.department_name;

                                            connection.query("UPDATE departments SET ? WHERE ?", [{

                                                total_sales: sumSales
                                            }, {
                                                department_name: departmentName

                                            }])
                                        }
                                    }
                                })
                                //Logs results to the user. the variable maybePluralize allows item to be displayed with correct suffix
                            const maybePluralize = (count, noun, suffix = 's') =>
                                `${count} ${noun}${count !== 1 && noun.charAt(noun.length-1)!== 's'? suffix : ''}`;
                            console.log("You have bought " + maybePluralize(parseInt(answer.quantity), chosenItem.product_name));
                            console.log("Your total is $" + total);
                            taskChoice();
                        }
                    })
                }

            }
        })
    })
}

function taskChoice() {
    inquirer.prompt([{

            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['buy-stuff', 'quit']
        }

    ]).then(function(choice) {

        if (choice.task === 'buy-stuff') {
            buyStuff();

        } else {
            console.log('Thank you for shopping at Bamazon, and have a super day!');
            connection.end(function(err) {
                // The connection is terminated gracefully

            });

        }
    });
}
