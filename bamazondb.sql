CREATE DATABASE Bamazon;

use Bamazon;

CREATE TABLE products (
item_id INT auto_increment NOT NULL,
product_name VARCHAR(250) NULL,
department_name VARCHAR(250) NULL,
price DECIMAL(13,4) NOT NULL DEFAULT 0,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES
("4D Master Gummi Bear Skeleton Anatomy Model Kit, Clear","Toys & Games",29.96,15),
("Multi-colored Dog Figurine","Toys & Games",40.00,20),
("Images You Should Not Masturbate To, paperback","Books",75.00,5),
("Asia Old Man Peel and Stick Wall Decals (18 in H x 14 in W)","Tools & Home Improvement",30.00,30),
("Majestic Handitaur Centaur Hand Finger Puppet Set","Toys & Games",15.00,40),
("MagiDeal Hen Stag Party Trophy Funny Prop Accessory","Electronics",3.25,10),
("Custom Nicolas Cage Pillowcase Standard Size Design Pillow Case Cover","Home & Kitchen",4.55,150),
("Dippin' Dots Ice Cream - 90 Servings of Rainbow Ice Dippin' Dots Ice Cream","Grocery & Gourmet Food",26.00,150),
("Rubie's Pet Costume Afro Curly Wig, Medium To Large, Black","Pet Supplies",8.95,50),
("Design Toscano Bigfoot the Giant Life-size Yeti Statue","Patio, Lawn & Garden",2226.00,18);
