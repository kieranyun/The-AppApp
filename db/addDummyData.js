import { faker } from '@faker-js/faker';

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.bi
const randomCountry =  faker.address.country();
const randomDOB = faker.date.between('1971-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z');
const randomCity = faker.address.city();
