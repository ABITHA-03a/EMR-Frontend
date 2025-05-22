// D:\my-login-app\app\_layout.jsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './styles/global.css'; // Path to your global Tailwind CSS

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#03DAC6',
    background: '#f6f6f6',
    surface: '#ffffff',
    text: '#000000',
    onSurface: '#000000',
    onBackground: '#000000',
    error: '#B00020',
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}> {/* Hide headers for all screens by default */}
          {/* The root path '/' will redirect to '/login' */}
          <Stack.Screen name="index" redirect />

          {/* Define the login screen route */}
          <Stack.Screen name="login/index" />

          {/* Define the registration screen route */}
          <Stack.Screen name="register/index" />

          {/* Add other screens as needed, e.g., for forgot password */}
          {/* <Stack.Screen name="forgot-password/index" /> */}
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}