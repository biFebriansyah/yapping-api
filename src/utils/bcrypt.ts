import * as bcrypt from 'bcrypt';

export async function HashPass(pass: string): Promise<string> {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, saltRounds);
  } catch (error) {
    throw error;
  }
}

export async function Validate(pass: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(pass, hash);
  } catch (err) {
    throw err;
  }
}
