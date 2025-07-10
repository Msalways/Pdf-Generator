import { SignupForm } from "@/components/signup-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
