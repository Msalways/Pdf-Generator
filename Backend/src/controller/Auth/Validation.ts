import { object, string } from "zod";

const AuthSchema = object({
  email: string().email("Invalid email format"),
  password: string().min(6, "Password must be at least 6 characters"),
});

const SignupSchema = object({
  email: string().email("Invalid email format"),
  password: string().min(6, "Password must be at least 6 characters"),
  name: string(),
});

export { AuthSchema, SignupSchema };
