/*
JSON is automatically included with each app.

Use the $fh.ready() (http://docs.feedhenry.com/wiki/Ready) function to trigger 
loading the local config and binding a click event to invoke the cloud action 
call which will return the remote config.
*/

$fh.ready(function() {
  // The local config variable from config.js can be accessed directly
  //document.getElementById('localConfig').innerHTML = "<p>" + JSON.stringify(config) + "</p>";

   document.getElementById('register_button').onclick = function() {
    $fh.act(
      {
      act:'registerPerson',
      req: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value
      }      
      }, 
      function(res) {
        if (!res.success) {
          document.getElementById("message").appendChild("Person Registered Failed");
        } else {
          document.getElementById("message").appendChild("Person Registered Successfully");
        }
      },
      function(msg,params) {
        alert('An error occured: ' + msg + ' : ' + params);
      }
      );
  };

  
  document.getElementById('search_button').onclick = function() {
    // Invoke a cloud action call to get the remote configuration
    // See: http://docs.feedhenry.com/wiki/Actions
    $fh.act(
      {
        act:'searchPerson',
        req: {
          age: document.getElementById("age").value
        }
      },
      function(res) {
        document.getElementById('personResults').innerHTML = "";
        var tableContents = "<tr><td style=\"WIDTH: 120px\" ><b>FIRST NAME</b></td><td style=\"WIDTH: 120px\" ><b>LAST NAME</b></td><td style=\"WIDTH: 120px\" ><b>AGE</b></td></tr>";
        for (var i = 0; i < res.list.length; i++) {
          tableContents += "<tr><td style=\"WIDTH: 120px\" >" + res.list[i].fields.firstName +"</td><td style=\"WIDTH: 120px\" >" + res.list[i].fields.lastName +"</td><td style=\"WIDTH: 120px\" >" + res.list[i].fields.age +"</td></tr>";
        }        
        document.getElementById('personResults').innerHTML=tableContents;
      },
      function(code,errorprops,params) {
        alert('An error occured: ' + code + ' : ' + errorprops);
      }
    );
  };
});