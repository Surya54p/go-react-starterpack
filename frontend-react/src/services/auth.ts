export type AuthResponse = {
  token: string;
};

const API_URL = "http://localhost:8080";
const TOKEN_KEY = "token";

/**
 * Fungsi inti autentikasi.
 * Dipakai oleh LoginForm & SignInForm.
 */
type LoginSuccessResponse = {
  success: true;
  data: {
    token: string;
  };
};

type LoginErrorResponse = {
  success: false;
  message: string;
};

type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export async function authenticate(
  email: string,
  password: string
): Promise<string> {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json: LoginResponse = await res.json();

  if (!json.success) {
    throw new Error(json.message);
  }

  localStorage.setItem(TOKEN_KEY, json.data.token);
  return json.data.token;
}                   

/**
 * Helper auth global
 */
export const auth = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUserRole(): "admin" | "user" | null {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

};

/**
 * Helper baca error backend (optional tapi rapi)
 */
// async function safeError(res: Response): Promise<string | null> {
//   try {
//     const json = await res.json();
//     return json?.message ?? null;
//   } catch {
//     return null;
//   }
// }
