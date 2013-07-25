var util = require('util');
/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
*/

exports.searchPerson = function(params, callback) {
  console.log("In searchPerson() call");
  $fh.db({
    "act": "list",
    "type": "Person",
    "fields" : ["firstName", "lastName", "age"],
    "eq": {
      "age": params.age
    },
    }, function (err, data) {
      console.log(data);
      return callback(null, data);
    });
};

exports.registerPerson = function(params, callback) {
  console.log(params.length);
  $fh.db({
    "act": "create",
    "type": "Person",
    "fields" : {
      "firstName" : params.firstName,
      "lastName" : params.lastName,
      "age" : params.age
    }
    },  function(err, data) {
    if (err) {
        return callback(null, {success: "false"});
    } else {
      console.log(JSON.stringify(data));
    }
    });  
    return callback(null, {success: "true"});
};