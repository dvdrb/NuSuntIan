// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { z } from 'zod';

export const NeverMissSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .toLowerCase()
    .trim()
    .min(1, {
      message: 'Email is required',
    })
    .email('This is not a valid email.'),
});

export type NeverMissSchemaType = z.infer<typeof NeverMissSchema>;
