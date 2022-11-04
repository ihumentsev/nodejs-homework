const { Command } = require("commander");
const {
  listContacts,
  removeContact,
  addContact,
  getContactById,
} = require("./contacts");
// const { table } = require("console");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

const argv = program.opts();
program.parse(process.argv);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.table(await getContactById(id));
      break;

    case "add":
      await addContact(name, email, phone);
      console.table(await listContacts());
      break;

    case "remove":
      await removeContact(id);
      console.table(await listContacts());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
