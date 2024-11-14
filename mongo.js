const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://myllymakiossi:${password}@munklusteri.idmdq.mongodb.net/?retryWrites=true&w=majority&appName=MunKlusteri`;

mongoose.set("strictQuery", false);
mongoose.connect(url).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1);
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log("Person saved!");
    mongoose.connection.close();
  });
} else {
  console.log("Invalid arguments");
  process.exit(1);
}
