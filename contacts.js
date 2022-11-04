const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const filter = data.filter((item) => item.id === contactId);
  return filter;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const delateContact = data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(delateContact));
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
