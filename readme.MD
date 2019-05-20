### ZX Coding Challenge

Data extract pulled from Northwind Sample Database. See `data` folder for query and csv `data/customer-orders.csv`

---

### Approach

Firstly, in a Production enviroment I would probably push a csv to a database staging table rather than process a large file line by line. Still, for the purposes on this tech test I'll process using [EventStream](https://www.npmjs.com/package/event-stream) (Uses streams therefore more performant on larger files)  

CSV file gets pulled in a http request. Saved to disk,  then processed by line.  

Used mssql library for database connectivity. Used same library previously with Fairfax.   

File moved to `processed` folder on completion (TODO - add some timestamp data to output file name)

- Extra logging to be implemented via winston library (ran out of time)
- Ditto, jest tests to be implemented (ran out of time)


--- 
