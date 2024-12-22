import { z } from 'zod';

export const validateEmail = (email) => {
  const config = z.string().email('Email is invalid');
  return config.safeParse(email);
};

export const validatePassword = (password) => {
  const config = z.string()
    .min(8, 'Password must contain at least 8 symbols')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  return config.safeParse(password);
};