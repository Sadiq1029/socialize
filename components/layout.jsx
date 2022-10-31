import Nav from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
