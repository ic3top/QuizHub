const userService = require("./user-service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../database");

const TOKEN_SECRET = "MOVE_THIS_TO_DOT_ENV";
const SALT_ROUNDS = 10;

const hashPassword = (plainPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
      if (err) reject(err);
      else
        bcrypt.hash(plainPassword, salt, function(err, hash) {
          if (err) reject(err);
          else
            resolve({
              hash,
              salt,
            });
        });
    });
  });

const checkPassword = (plainPassword, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hash, function(err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });

const registerUser = async (name, password, email) => {
  const hashed = await hashPassword(password);
  try {
    const user = await User.create({
      Name: name,
      Password: hashed.hash,
      Email: email,
      Salt: hashed.salt,
    });
    return userService.getUser(user.id);
  } catch (error) {
    console.log(error);
  }
};

const getAuthToken = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user === null) return null;
  const passwordMatches = await checkPassword(password, user.Password);
  if (!passwordMatches) return null;
  const token = jwt.sign({ user_id: user.id, email }, TOKEN_SECRET, {
    expiresIn: "2h",
  });
  //await User.update({ Token: token }, { where: { id: user.id } });
  return token;
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    if (!token) return reject(null);
    jwt.verify(token, TOKEN_SECRET, (err, claims) => {
      if (err) {
        console.log(err);
        reject(err);
      } else resolve(claims);
    });
  });

module.exports = {
  registerUser,
  getAuthToken,
  verifyToken,
};
