import { Resend } from 'resend';
import WelcomeEmail from './welcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

 export async function postEmail(user: { email: string; name: string }) { 
 await resend.emails.send({
 from: 'FBForum <onboarding@resend.dev>',
  to: user.email,
  subject: 'Добро пожаловать!',
  react: <WelcomeEmail username={user.name} />
 })
}
 