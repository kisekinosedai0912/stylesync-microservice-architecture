import { z } from "zod";

export const signupSchema = z.object({
	username: z.string().nonempty("Must have a username"),
	password: z.string().nonempty("Must have a password"),
	email: z.string().nonempty("Email must not be empty"),
	fullname: z.string().nonempty("User must register its full name"),
	role: z.string().nonempty("No role specified"),
});

export const loginSchema = z.object({
	username: z.string().nonempty("Username is empty"),
	password: z.string().nonempty("No password provided"),
});

export type Signup = z.infer<typeof signupSchema>;
export type Login = z.infer<typeof loginSchema>;
