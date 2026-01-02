import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-xl">404</h1>
      <Link className="underline" to="/dashboard">Go home</Link>
    </div>
  );
}
