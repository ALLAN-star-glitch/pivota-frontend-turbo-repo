import TopBar from "./TopBar";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";

export default function Navbar() {
  return (
    <>
      <aside>
        <TopBar />
      </aside>

      <nav className="sticky top-0 z-50 w-full bg-white">
        <MainNav />
        <SecondaryNav/>
      </nav>
    </>
  );
}
