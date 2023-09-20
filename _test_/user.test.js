import '../config.js';
import db from '../dist/db/';
import { insertUser } from "../dist/controllers/user.js";

beforeAll(async () => {
  await db.initialize();
});

afterAll(async () => {
  await db.dataSource.destroy();
});

const tmpData = {
  "userName": "SomePerson",
  "firstName": "Leo",
  "lastName": "James",
  "email": "test@email.com",
  "password": "123456",
  "dateOfBirth": "2022-02-02",
  "roles": [1, 3]
};

describe("Create user process", () => {
  let result;
  beforeAll(async () => {
    result = await insertUser(tmpData);
  })

  it("saves user and profile", async () => {
    expect(result).toBeDefined();
  });

});

describe("Assign Role to User", () => {
  let result;
  beforeAll(async () => {
    result = await insertUser(tmpData);
  })

  it("saves user and profile", async () => {
    expect(result).toBeDefined();
  });

});