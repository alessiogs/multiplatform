import { Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, useColorScheme, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text } from '@multiplatform/ui';
import { colors, radii, spacing } from '@multiplatform/tokens';

export function AuthScreen({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Link href="/" asChild>
            <Pressable style={styles.brandLink}>
              <View style={[styles.brandMark, { backgroundColor: theme.primary }]}>
                <Text variant="heading" color="background">M</Text>
              </View>
              <Text variant="heading">Multiplatform</Text>
            </Pressable>
          </Link>
          <Card variant="elevated" padding="lg" style={styles.card}>
            {children}
          </Card>
          <Text variant="small" color="textSecondary" style={styles.footer}>
            A shared place for what matters.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const authStyles = StyleSheet.create({
  intro: { gap: spacing.one, marginBottom: spacing.four },
  form: { gap: spacing.three },
  field: { gap: spacing.one },
  label: { fontWeight: '600' },
  message: { borderRadius: radii.md, padding: spacing.two },
  switch: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.four,
  },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: spacing.four },
  content: { alignSelf: 'center', gap: spacing.four, width: '100%', maxWidth: 440 },
  brandLink: { alignItems: 'center', alignSelf: 'center', flexDirection: 'row', gap: spacing.two },
  brandMark: {
    alignItems: 'center',
    borderRadius: radii.md,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  card: { gap: spacing.three },
  footer: { textAlign: 'center' },
});
