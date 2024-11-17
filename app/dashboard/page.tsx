import { requireUser } from "../lib/hooks";

async function DashboardPage() {
  const session = await requireUser();

  return <div>DashboardPage</div>;
}

export default DashboardPage;
