import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthSessionProvider, useAuthSession } from '@/features/auth/session';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthSessionProvider>
        <AnimatedSplashOverlay />
        <RootNavigator />
      </AuthSessionProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { accessToken } = useAuthSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!accessToken}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
      </Stack.Protected>
      <Stack.Protected guard={Boolean(accessToken)}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
