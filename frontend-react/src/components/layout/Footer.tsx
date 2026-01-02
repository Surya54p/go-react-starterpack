export default function Footer() {
  return (
    <footer className="w-full px-38 py-16 border-t bg-white">
      {/* Top Section */}
      <div className="flex justify-between items-start gap-16">
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            <div className="w-8 h-8 rounded-full bg-red-500" />
            <span className="text-lg font-semibold">Surya.co</span>
          </div>

          <p className="text-sm text-gray-600">Pure energy for great synergy</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-gray-900">Quick Links</h4>

          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Services</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 max-w-md">
          <h4 className="text-sm font-semibold text-gray-900">Contact Information</h4>

          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li>Address: Jl. Contoh No. 12, Jakarta, Indonesia</li>
            <li>Phone: +62 812 3456 7890</li>
            <li>Email: pureenergy@surya.co</li>
            <li>WhatsApp: +62 812 3456 7890</li>
          </ul>

          {/* Map */}
          <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-200">
            <img src="/map.png" alt="Location map" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 flex justify-between items-center text-xs text-gray-500">
        <span>© 2025 Surya.co. All Rights Reserved.</span>

        <span className="cursor-pointer hover:text-black">Privacy Policy | Terms & Conditions</span>
      </div>
    </footer>
  );
}
