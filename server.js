var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require("body-parser");
var path = require('path');

// Parse the text as a url encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

var cloudant, koneTask;

/**
 * Use Case 1
 * Endpoint to get a JSON array of X number of equipments
 * REST API example:
 * <code>
 * GET http://localhost:3001/kone-task/equipment/search?limit={3}
 * </code>
 */

app.get("/kone-task/equipment/search", function(request, response) {
  var equipments = [];
  if (!koneTask) {
    response.json(equipments);
    return;
  }
  
   koneTask.list({ include_docs: true, limit: request.query.limit }, function(
    err,
    body
  ) {
    if (!err) {
      body.rows.forEach(function(row) {
        if (row.doc) equipments.push(row.doc);
      });
      response.json(equipments);
    }
  });
});

/**
 * Use Case 2
 * Endpoint to get a signle equipment details based on equipment number
 * REST API example:
 * <code>
 * GET http://localhost:3001/kone-task/equipment/{equipmentNumber}
 * </code>
 */
app.get("/kone-task/equipment/:equipmentNumber", function(request, response) {
  var equipment = {};
  if (!koneTask) {
    response.json(equipment);
    return;
  }

  koneTask.find(
    { selector: { equipmentNumber: request.params.equipmentNumber } },
    function(err, res) {
      if (!err) {
        equipment = res;
        response.json(equipment);
      }
    }
  );
});

/**
 * Use Case 3
 * Endpoint to create new equipment
 * REST API example:
 * <code>
 * POST http://localhost:3001/kone-task/equipment
 * </code>
 */
app.post("/kone-task/equipment", function(request, response) {
  var equipmentNumber = request.body.equipmentNumber;
  var address = request.body.address;
  var contractStartDate = request.body.contractStartDate;
  var contractEndDate = request.body.contractEndDate;
  var status = request.body.status;
  var doc = {
    equipmentNumber: equipmentNumber,
    address: address,
    contractStartDate: contractStartDate,
    contractEndDate: contractEndDate,
    status: status
  };
  if (!koneTask) {
    console.log("Database is not available.");
    response.send(doc);
    return;
  }
  // insert the equipment detail as a document
  koneTask.insert(doc, function(err, body, header) {
    if (err) {
      console.log("[Insert Error] ", err.message);
      response.send("Error");
      return;
    }
    doc._id = body.id;
    response.send(doc);
  });
});

/**
 * Following code will enable to run the database locally 
 */
var vcapLocal;
try {
  vcapLocal = require("./vcap-local.json");
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) {}

const appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {};

const appEnv = cfenv.getAppEnv(appEnvOpts);

/**
 * Create Cloudant database
 */
var Cloudant = require("@cloudant/cloudant");
if (appEnv.services["cloudantNoSQLDB"] || appEnv.getService(/cloudant/)) {
  if (appEnv.services["cloudantNoSQLDB"]) {
    cloudant = Cloudant(appEnv.services["cloudantNoSQLDB"][0].credentials);
  } else {
    cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }
} else if (process.env.CLOUDANT_URL) {
  cloudant = Cloudant(process.env.CLOUDANT_URL);
}
if (cloudant) {
  var dbName = "koneTask";

  cloudant.db.create(dbName, function(err, data) {
    if (!err) console.log("Created new database: " + dbName);
  });

  koneTask = cloudant.db.use(dbName);
}

// Just for testing
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("App is running on: http://localhost:" + port);
});
