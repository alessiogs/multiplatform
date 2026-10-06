"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button, Input } from "@multiplatform/ui";
import { login } from "../lib/api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError("");
    setSuccess(false);
    setBusy(true);
    try {
      await login({ email, password });
      setSuccess(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <header className="auth-intro">
        <h1>Welcome back</h1>
        <p>Sign in to continue to your account.</p>
      </header>
      <form className="auth-form" onSubmit={submit}>
        <label className="auth-field">
          <span className="auth-label">Email address</span>
          <Input
            type="email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            required
            accessibilityLabel="Email address"
          />
        </label>
        <label className="auth-field">
          <span className="auth-label">Password</span>
          <Input
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            required
            accessibilityLabel="Password"
          />
        </label>
        {error && (
          <p className="auth-message auth-message--error" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="auth-message auth-message--success" role="status">
            You’re signed in successfully.
          </p>
        )}
        <Button type="submit" disabled={busy} size="lg">
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <p className="auth-switch">
        New here? <Link href="/register">Create an account</Link>
      </p>
    </>
  );
}
