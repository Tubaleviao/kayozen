import Navbar from "../islands/Navbar.tsx";
import ChooseRoleBox from "../islands/ChooseRoleBox.tsx";
import { defautGuard } from "../utils/guards.ts"

export const handler = defautGuard

export default function ChooseRolePage() {
  return (
    <div class="min-h-screen bg-kayozen-light-background dark:bg-kayozen-dark-background text-kayozen-light-text dark:text-kayozen-dark-text">
      <Navbar />
      <ChooseRoleBox />
    </div>
  );
}
