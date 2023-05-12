import * as bcrypt from 'bcrypt';

export class Hash {
  static async hash(arg: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(arg, salt);

      return hash;
    } catch (error) {
      console.log(error);
    }
  }
  static async compare(password: string, hash: string): Promise<boolean> {
    const isMatched = await bcrypt.compare(password, hash);
    return isMatched;
  }
}
