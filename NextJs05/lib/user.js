import db from "./db";

export function createUser(email, password) {
  const query = "INSERT INTO users (email, password) VALUES(?,?)";
  const result = db.prepare(query).run(email, password);

  return result.lastInsertRowid;
}

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}
