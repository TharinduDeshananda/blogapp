import bcrypt from "bcrypt";

// Number of salt rounds for bcrypt (adjust according to your security requirements)
const saltRounds = 10;

/**
 * Hashes a plaintext password using bcrypt.
 * @param password - The plaintext password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plaintext password with a hashed password to validate it.
 * @param password - The plaintext password to compare.
 * @param hashedPassword - The hashed password stored in the database.
 * @returns A promise that resolves to a boolean indicating whether the password is valid.
 */
export async function validatePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
