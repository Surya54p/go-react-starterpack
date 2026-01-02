import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      alert(await res.text());
      return;
    }
    const data = await res.json();
    localStorage.setItem("token", data.token);

    window.location.href = "/dashboard";
    alert("Akun dibuat, silakan login");
  };

  return (
    <form className="max-w-sm mx-auto mt-20 space-y-4" onSubmit={submit}>
      <h1 className="text-xl font-bold">Sign Up</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-black text-white w-full py-2">Sign Up</button>
    </form>
  );
}
