"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {}, //Pusta funkcja jako domyślna
  logout: () => {}, //Pusta funkcja jako domyślna
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname(); //Pobranie aktualnej ścieżki

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  }, [setIsLoggedIn, router]);

  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const jwtPayload = JSON.parse(atob(token.split(".")[1]));
        const isTokenValid = jwtPayload.exp * 1000 > Date.now();

        if (isTokenValid) {
          setIsLoggedIn(true);

          //Przekierowanie na stronę główną, jeśli użytkownik jest zalogowany
          if (pathname === "/login" || pathname === "/register") {
            router.push("/");
          }
        } else {
          //Token wygasł, wyloguj użytkownika
          localStorage.removeItem("token");
          logout(); //Wylogowanie użytkownika
        }
      } catch (error) {
        console.error("Nieprawidłowy token", error);
        localStorage.removeItem("token");
        logout(); //Wylogowanie użytkownika
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [logout, pathname, router]);

  useEffect(() => {
    checkTokenValidity(); //Sprawdza ważność tokena na początku

    const interval = setInterval(checkTokenValidity, 60000); //Co minutę
    return () => clearInterval(interval); //Wyczyszczenie interwału przy odmontowywaniu komponentu
  }, [checkTokenValidity]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
