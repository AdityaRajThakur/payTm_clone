const mongoose = require("mongoose");
const url =
  "mongodb+srv://rajaditya0thakur:dq0P3wkxNQt1sjFS@cluster0.vyrcpnp.mongodb.net/paytmDatabase";

function connect() {
  mongoose
    .connect(url)
    .then((res) => {
      console.log("connected to database succesfully");
    })
    .catch((res) => {
      console.log("failed to connect to database");
    });
}

connect();

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minLength: 3 },
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: { type: mongoose.Schema.Types.Number, required: true },
});

const Account = new mongoose.model("Account", AccountSchema);
const User = new mongoose.model("User", UserSchema);

module.exports = {
  User,
  Account,
};
