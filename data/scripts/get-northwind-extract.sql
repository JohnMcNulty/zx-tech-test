USE NORTHWIND
GO

DECLARE @BadCustomers AS TABLE  ( -- Add some non-existent CustomersIds
	OrderId int,
	CustomerId char(5),
	ProductName varchar(50),
	Quantity int
)
INSERT INTO @BadCustomers VALUES (10200, 'DUMMY', 'Stuff', 1)
INSERT INTO @BadCustomers VALUES (10200, 'DUMMY', 'Things', 2)
INSERT INTO @BadCustomers VALUES (10200, 'DUMMY', 'Extras', 3)
INSERT INTO @BadCustomers VALUES (10200, 'DUMMY', 'Misc', 4)
INSERT INTO @BadCustomers VALUES (10210, 'NOONE', 'Drinks', 5)
INSERT INTO @BadCustomers VALUES (10210, 'NOONE', 'Chips', 6)

SELECT 
	o.OrderId,
	c.CustomerId,
	p.ProductName,
	od.Quantity

FROM	 
	Customers c
INNER JOIN 
	Orders o ON (o.CustomerID = c.CustomerID)
INNER JOIN 
	[Order Details] od ON (od.OrderID = o.OrderID)
INNER JOIN 
	Products p ON (p.ProductID = od.ProductID)

UNION -- Append some non-existent CustomersIds
SELECT OrderId,	CustomerId,ProductName,Quantity FROM @BadCustomers


ORDER BY 
	OrderId, CustomerId, ProductName
