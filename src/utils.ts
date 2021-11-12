import * as bcrypt from 'bcrypt';

export const PromisifiedBcryptHash = (pass, saltRounds): Promise<string> =>
  new Promise((res, rej) =>
    bcrypt.hash(pass, saltRounds, (err, hash) => (err ? rej(err) : res(hash))),
  );
