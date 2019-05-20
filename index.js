const http = require('http');
const fs = require('fs');
const es = require('event-stream');
const request = require('request');
require('dotenv').config()
const mv = require('mv');

const dataAccess = require('./data-access');

const FILES_IN = './files/in/';
const FILES_OUT = './files/processed/';
const FILE_PATH = FILES_IN + process.env.CUST_ORDERS_FILE


request(process.env.CUST_ORDERS_PATH + process.env.CUST_ORDERS_FILE)
  .pipe(fs.createWriteStream(FILES_IN + process.env.CUST_ORDERS_FILE )) // store file

fs
  .createReadStream(FILES_IN + process.env.CUST_ORDERS_FILE)
  .pipe(es.split())
  .pipe(
    es
      .mapSync(line => {
    
        // call database insert (will not insert if already exists)
        const args = line.split(',');
        console.log(args)
        if(args.length === 4){
            dataAccess.insertOrder(args[0], args[1], args[2], args[3]);
        } else {
            console.log('bad line');
            // log
        }

    
      })
      .on('error', err => {
        console.log('Error while reading file.', err);
        // write error to log

      })
      .on('end', () => {
        console.log('Read entire file.');

        // move file to processed with timestamp [TODO]
        mv(FILE_PATH, FILES_OUT + '_processed_' + process.env.CUST_ORDERS_FILE, {mkdirp: true}, function(err) {
            console.log('moved');
          });
      }),
  );


