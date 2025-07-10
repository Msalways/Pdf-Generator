import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";
import { useNavigate } from "@tanstack/react-router";
import { useValidateSessionQuery } from "@/lib/hooks/Auth/useValidateSessionQuery";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useValidateSessionQuery();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    navigate({ to: "/Login" });
    return null;
  }

  if (data) {
    navigate({ to: "/Report" });
    return null;
  }
}
