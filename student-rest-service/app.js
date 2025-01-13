const restify = require('restify');
const { MongoClient } = require('mongodb');

const mongoUrl = "mongodb://localhost:27017/StudentDb";
const client = new MongoClient(mongoUrl);

async function startServer() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB.");

        const studentDB = client.db('StudentDb');
        const studentDBCollection = studentDB.collection('students');

        const server = restify.createServer();
        server.use(restify.plugins.bodyParser());

        server.listen(8080, '127.0.0.1', function() {
            console.log('%s listening at %s', server.name, server.url);
        });
        

        // REST Operations
        server.post('/student', async (req, res) => {
            try {
                const newStudent = req.body;
                await insertStudent(studentDBCollection, newStudent, res);
            } catch (error) {
                res.send(500, { message: "Error inserting student", error });
            }
        });

        server.del('/student/:familyName/:surname', async (req, res) => {
            try {
                const { familyName, surname } = req.params;
                await deleteStudent(studentDBCollection, { familyName, surname }, res);
            } catch (error) {
                res.send(500, { message: "Error deleting student", error });
            }
        });

        server.get('/student', async (req, res) => {
            try {
                await sendStudentsStream(studentDBCollection, res, {});
            } catch (error) {
                res.send(500, { message: "Error retrieving students", error });
            }
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

// MongoDB Operations
async function insertStudent(DBCollection, student, res) {
    await DBCollection.insertOne(student);
    res.send(201, { message: 'Student inserted' });
}

async function deleteStudent(DBCollection, studentKey, res) {
    const result = await DBCollection.deleteOne(studentKey);
    if (result.deletedCount === 0) {
        res.send(404, { message: "Student not found" });
    } else {
        res.send(204);
    }
}

async function sendStudentsStream(DBCollection, res, query) {
    const data = await DBCollection.find(query).toArray();
    res.send(200, data);
}

// Start the server
startServer();
