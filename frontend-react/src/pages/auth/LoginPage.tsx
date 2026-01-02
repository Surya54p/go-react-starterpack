import { useEffect, useState } from "react";
import { auth, authenticate } from "../../services/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface FlashMessageState {
  message?: string;
  type?: "success" | "error" | "warning" | "info";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // catching any message from auth
  useEffect(() => {
    const state = location.state as FlashMessageState | undefined;

    if (!state?.message) return;

    Swal.fire({
      icon: state.type ?? "info",
      title: state.message,
    });
  }, [location.state]);

  // submite handler
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authenticate(email, password);

      const role = auth.getUserRole();

      await Swal.fire({
        icon: "success",
        title: "Login berhasil",
        text: "Selamat datang 👋",
        timer: 1500,
        showConfirmButton: false,
      });

      if (role === "admin") {
        navigate("../admin/dashboard");
      } else {
        navigate("../user/dashboard");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";

      await Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: message,
      });
    }
  };

  return (
    <form className="max-w-sm mx-auto mt-20 space-y-4" onSubmit={submit}>
      <h1 className="text-xl font-bold">Login</h1>

      <input
        type="email"
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-black text-white w-full py-2">Login</button>
    </form>
  );
}
