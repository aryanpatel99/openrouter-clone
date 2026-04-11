import { redirect } from "next/navigation";

export default function WorkspacePage() {
  // Redirect the base workspace route to the api-keys page by default
  redirect("/workspace/api-keys");
}
