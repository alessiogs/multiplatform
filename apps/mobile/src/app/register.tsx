import { useState } from 'react';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@multiplatform/ui';
import { colors } from '@multiplatform/tokens';

import { AuthScreen, authStyles } from '@/features/auth/components/auth-screen';
import { register } from '@/features/auth/api';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function submit() {
    setBusy(true);
    setError('');
    setSuccess(false);
    try {
      await register({ username, email, password });
      setSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to create your account. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthScreen>
      <View style={authStyles.intro}>
        <Text variant="heading">Create your account</Text>
        <Text variant="small" color="textSecondary">Get started with a few details.</Text>
      </View>
      <View style={authStyles.form}>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>Username</Text>
          <Input value={username} onChangeText={setUsername} placeholder="Choose a username" required accessibilityLabel="Username" />
        </View>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>Email address</Text>
          <Input type="email" value={email} onChangeText={setEmail} placeholder="you@example.com" required accessibilityLabel="Email address" />
        </View>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>Password</Text>
          <Input type="password" value={password} onChangeText={setPassword} placeholder="Create a password" required accessibilityLabel="Password" />
        </View>
        {error ? (
          <View style={[authStyles.message, { backgroundColor: 'rgba(214, 69, 69, 0.1)' }]}>
            <Text color="danger" accessibilityLabel={error}>{error}</Text>
          </View>
        ) : null}
        {success ? (
          <View style={[authStyles.message, { backgroundColor: 'rgba(22, 116, 74, 0.1)' }]}>
            <Text style={styles.success}>Your account is ready. Sign in to continue.</Text>
          </View>
        ) : null}
        <Button type="submit" onPress={() => void submit()} disabled={busy} size="lg">
          {busy ? 'Creating account…' : 'Create account'}
        </Button>
      </View>
      <View style={authStyles.switch}>
        <Text variant="small" color="textSecondary">Already have an account? </Text>
        <Link href="/" asChild>
          <Pressable accessibilityRole="link"><Text variant="small" style={styles.link}>Sign in</Text></Pressable>
        </Link>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  link: { color: colors.light.primary, fontWeight: '600' },
  success: { color: '#16744a' },
});
