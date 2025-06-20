const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/managme", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  await User.deleteMany();

  await User.create([
    {
      login: "admin",
      password: "admin123",
      firstName: "Anna",
      lastName: "Nowak",
      role: "admin",
    },
    {
      login: "dev1",
      password: "dev123",
      firstName: "Michał",
      lastName: "Kowalski",
      role: "developer",
    },
    {
      login: "devops",
      password: "devops123",
      firstName: "Ewa",
      lastName: "Wiśniewska",
      role: "devops",
    },
  ]);

  console.log("✅ Użytkownicy zapisani");
  mongoose.disconnect();
}

seed();
