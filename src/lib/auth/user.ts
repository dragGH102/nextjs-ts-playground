import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-named-as-default
import moment from 'moment';
import executeQuery from './db';

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ email, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  // store in db
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  const user = {
    id: uuidv4(),
    createdAt: moment()
      .format('YYYY-MM-DD HH:mm:ss')
      .toString(),
    email,
    hash,
    salt,
  };
  const query =
    'INSERT INTO users(id, createdAt, email, hash, salt) VALUES(?, ?, ?, ?, ?)';
  const values = Object.values(user);

  try {
    const result = await executeQuery({
      query,
      values,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return user;
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
  try {
    const result = await executeQuery({
      query: 'SELECT * FROM users W HERE email = ?',
      values: [email],
    });

    return result[0];
  } catch (error) {
    console.log(error);
  }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');

  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
