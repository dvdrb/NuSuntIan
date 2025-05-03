// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { z } from 'zod';

export const AdministratorSchema = z.object({
  name: z
    .string({
      required_error: 'Login is required',
    })
    .toLowerCase()
    .trim()
    .min(1, {
      message: 'Login is required',
    })
    .refine((val) => val === 'admin', { message: 'Login is incorrect' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .toLowerCase()
    .trim()
    .min(1, {
      message: 'Password is required',
    })
    .refine((val) => val === 'hqadmin00!ian', {
      message: 'Password is incorrect',
    }),
});

export type AdministratorSchemaType = z.infer<typeof AdministratorSchema>;
