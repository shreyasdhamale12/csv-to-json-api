const fs = require('fs');
const { faker } = require('@faker-js/faker');

const COUNT = 5000;

const headers = [
  "name.firstName",
  "name.lastName",
  "age",
  "address.line1",
  "address.city",
  "gender",
];

const genders = ["male", "female", "other"];

const rows = [headers.join(",")];

for (let i = 0; i < COUNT; i++) {
  const first = faker.person.firstName();      // ✅ new method
  const last = faker.person.lastName();        // ✅ new method
  const age = faker.number.int({ min: 10, max: 89 }); // random age
  const line1 = faker.location.streetAddress(); // ✅ new method
  const city = faker.location.city();           // ✅ new method
  const gender = faker.helpers.arrayElement(genders); // safer & cleaner

  rows.push(`${first},${last},${age},${line1},${city},${gender}`);
}

fs.writeFileSync("data/users.csv", rows.join("\n"));
console.log(`✅ Generated ${COUNT} users in data/users.csv`);
