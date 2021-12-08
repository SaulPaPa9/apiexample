print("Started adding the users.");
db = db.getSiblingDB("admin");
db.createUser({
  user: "saulpa",
  pwd: "r0tr0ta",
  roles: [{ role: "readWrite", db: "cleanappdb" }],
});
print("End adding the user roles.");

