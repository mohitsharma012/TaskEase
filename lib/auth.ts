
interface UserData {
  userId: string;
  email: string;
}

export const verifyToken = async (token?: string): Promise<UserData | null> => {
  const tokenToUse = token || localStorage.getItem("token");

  if (!tokenToUse) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/verify-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenToUse}`,
      },
    });

    if (!response.ok) throw new Error("Invalid token");

    const data = await response.json();
    return { userId: data.userId, email: data.email };
  } catch (error) {
    console.error("Verify token error:", error);
    return null;
  }
};





export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, action: 'login' }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    return { token: data.token, userId: data.userId };
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, action: 'signup' }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    return { token: data.token, userId: data.userId };
  } catch (error: any) {
    throw new Error(error.message || 'Signup failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = await verifyToken(token);
    if (!decoded) return null;
    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return null;
  }
};