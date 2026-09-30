# Multiplatform

Workspace for the Next.js, React SPA, and Expo clients with shared design tokens and UI components.

## Authentication

The web clients post to `/auth/login` and `/auth/register`; Expo uses `/auth/mobile/login` for login and the same registration endpoint. Set the API origin with `NEXT_PUBLIC_API_URL`, `VITE_API_URL`, and `EXPO_PUBLIC_API_URL` respectively. Each defaults to `http://localhost:3000`.

For Expo on a physical device, set `EXPO_PUBLIC_API_URL` to the development machine's LAN address so the device can reach the NestJS server.
