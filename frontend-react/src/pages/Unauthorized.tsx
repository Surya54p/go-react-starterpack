export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">403 – Unauthorized</h1>

        <p className="mt-4 text-gray-600">Kamu tidak punya izin untuk mengakses halaman ini.</p>

        <a href="/" className="inline-block mt-6 text-sm text-blue-600 hover:underline">
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
