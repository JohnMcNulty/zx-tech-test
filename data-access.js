const sql = require('mssql')
require('dotenv').config()

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER, 
    database: process.env.DATABASE,
}

const cp = new sql.ConnectionPool(config).connect(err => {
    console.log("*************************")
    console.log(err) // log
    console.log("*************************")
});

module.exports = {

    insertOrder: async function insertOrder(orderId, customerId, item, quantity) {
        try {
            await cp;
            const result = await cp.request()
                .input("orderId", sql.Int, orderId)
                .input("customerId", sql.VarChar(5), customerId)
                .input("item", sql.VarChar(50), item)
                .input("quantity", sql.Int, quantity)
                .query(`IF NOT EXISTS (SELECT * FROM Orders WHERE CustomerId = @customerId)
                    BEGIN
                        INSERT INTO Orders VALUES (@orderId, @customerId, @item, @quantity)
                    END`);
            cp.close();
            return result;
        }
        catch (err) {
            console.error('SQL error', err); // log
        }
    }
}