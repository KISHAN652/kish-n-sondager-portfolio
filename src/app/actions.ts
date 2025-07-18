'use server';

import { Resend } from 'resend';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type FormData = z.infer<typeof formSchema>;

export async function sendEmail(data: FormData) {
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  const { name, email, message } = result.data;

  // This check is a failsafe. You should have RESEND_API_KEY set in your environment variables.
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set.');
    return { success: false, error: 'The server is not configured to send emails.' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data: responseData, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // This must be a verified domain in Resend
      to: 'gajjarsk111@gmail.com', // CHANGE THIS to your personal email
      subject: `New message from ${name} via your portfolio`,
      reply_to: email,
      html: `
        <p>You have received a new message from your portfolio contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return { success: false, error: error.message || 'Failed to send message.' };
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
