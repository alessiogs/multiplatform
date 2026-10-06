"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button, Input } from "@multiplatform/ui";
import { register } from "../lib/api";

export function RegisterForm() {
  const [username, setUsername] = useState("");
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
      await register({ username, email, password });
      setSuccess(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <header className="auth-intro">
        <h1>Create your account</h1>
        <p>Get started with a few details.</p>
      </header>
      <form className="auth-form" onSubmit={submit}>
        <label className="auth-field">
          <span className="auth-label">Username</span>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Choose a username"
            required
            accessibilityLabel="Username"
          />
        </label>
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
            placeholder="Create a password"
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
            Your account is ready. <Link href="/login">Sign in</Link>
          </p>
        )}
        <Button type="submit" disabled={busy} size="lg">
          {busy ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  );
}
