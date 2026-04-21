export default function WelcomeEmail({ username }: { username: string }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Добро пожаловать, {username}!</h1>
      <p>Спасибо за регистрацию на fbforum.kz.</p>
    </div>
  );
}