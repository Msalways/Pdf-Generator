import { LoginForm } from "@/components/login-form";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Login/")({
  component: Login,
});

function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
