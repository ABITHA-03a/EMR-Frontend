// D:\my-login-app\app\index.jsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the login screen immediately
  return <Redirect href="/login" />;
}