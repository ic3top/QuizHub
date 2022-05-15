const db = require("./database");
const server = require("./api/server");

const start = async () => {
  for (const key in db) {
    if (Object.hasOwnProperty.call(db, key)) {
      const element = db[key];
      await element.sync();
    }
  }

  const EXPRESS_PORT = process.env.EXPRESS_PORT || 8080;
  server.listen(EXPRESS_PORT, () => {
    console.log(`Server listening on http://localhost:${EXPRESS_PORT}`);
  });
};

start();
