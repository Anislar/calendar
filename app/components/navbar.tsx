import Link from "next/link";
import Logo from "../../components/logo";
import AuthModal from "@/components/auth-modal";

function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between ">
      <Link href="/">
        <Logo />
      </Link>
      <AuthModal />
    </div>
  );
}

export default Navbar;
