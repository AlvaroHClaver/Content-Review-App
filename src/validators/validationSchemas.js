import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "This field is mandatory!" })
      .min(3, { message: "The username must be at least 3 characters." })
      .max(20, { message: "The username can't be longer than 20 characters." }),
    password: z
      .string()
      .nonempty({ message: "This field is mandatory!" })
      .min(6, { message: "The password must be at least 6 characters." })
      .max(50, { message: "The password can't be longer than 50 characters." }),
    confirmPassword: z
      .string()
      .nonempty({ message: "This field is mandatory!" }),
    yearOfBirth: z
      .string()
      .nonempty({ message: "This field is mandatory!" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "The date format must be YYYY-MM-DD."),
    state: z.string().nonempty({ message: "This field is mandatory!" }),
    city: z.string().nonempty({ message: "This field is mandatory!" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords doesn't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().nonempty({ message: "This field is mandatory!" }),
  password: z.string().nonempty({ message: "This field is mandatory!" }),
});
