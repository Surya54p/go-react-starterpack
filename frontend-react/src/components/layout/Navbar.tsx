interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Support", href: "/support" },
];

export default function Navbar() {
  return (
    <nav className="w-full px-38 py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight">Nuvatech</div>

      {/* Menu */}
      <ul className="flex items-center gap-8 text-sm text-gray-700">
        {NAV_ITEMS.map((item) => (
          <li key={item.name} className="cursor-pointer hover:text-black transition">
            {item.href}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button type="button" className="bg-black text-white text-sm px-5 py-2 rounded-md hover:bg-gray-900 transition">
        Shop
      </button>
    </nav>
  );
}
