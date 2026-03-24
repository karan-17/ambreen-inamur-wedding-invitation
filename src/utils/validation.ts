import { z } from 'zod'

/**
 * RSVP form validation schema
 */
export const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional(),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .optional(),
  attending: z.enum(['yes', 'no'], {
    message: 'Please let us know if you will be attending'
  }),
  guestCount: z
    .number()
    .min(1, 'At least 1 guest is required')
    .max(10, 'Maximum 10 guests allowed')
    .optional(),
  dietaryRestrictions: z
    .string()
    .max(500, 'Dietary restrictions must be less than 500 characters')
    .optional(),
  specialRequests: z
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional(),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>