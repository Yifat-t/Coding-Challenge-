window.onload = function() {
    var setupUserCard = function(jsonResponse) {
        document.getElementById("employeefname").innerText = jsonResponse.employeefname;
        document.getElementById("employeelname").innerText = jsonResponse.employeelname;
        document.getElementById("employeebio").innerText = jsonResponse.employeebio;
        document.getElementById("employeephoto").innerHTML = "<p><img class='circle' src='http://sandbox.bittsdevelopment.com/code1/employeepics/" + jsonResponse.employeeid + ".jpg'></p>";
    
        if (jsonResponse.employeeisfeatured === "1") {
            document.getElementById("employeeisfeatured").innerHTML = '<img src="images/crown.png" alt="crown image">';
        }

        var employeeRolesHTML = "";

        for (var i = 0; i < jsonResponse.roles.length; i++) {
            var role = jsonResponse.roles[i];

            employeeRolesHTML += '<span style="background: ' + role.rolecolor + ';">'+ role.rolename + '</span>';
        }

        document.getElementById("employeeroles").innerHTML = employeeRolesHTML;
    } 

    var xmlhttp = new XMLHttpRequest();
    var xmldocument;
    xmlhttp.onreadystatechange  = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                console.log(xmlhttp.response[1]);

                setupUserCard(xmlhttp.response[1]);
            }
            else if (xmlhttp.status == 400) {
            alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    }
    xmlhttp.onerror = function() {
    console.log("Error while loading XML...");
    }
    //the actual lines to request the JSON
    xmlhttp.open("GET", "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php"); //request to open file
    xmlhttp.responseType = "json";
    xmlhttp.send();

}