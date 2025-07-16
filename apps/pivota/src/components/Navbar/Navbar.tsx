import TopBar from "./TopBar";
import MainNav from "./MainNav";

export default function Navbar() {
  return (
    <>
      <aside>
        <TopBar />
      </aside>

      <nav className="sticky top-0 z-50 w-full bg-white shadow">
        <MainNav />
      </nav>
    </>
  );
}
