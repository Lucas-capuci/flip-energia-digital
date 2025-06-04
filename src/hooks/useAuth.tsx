import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // NOVO: estado de carregamento

  useEffect(() => {
    const checkSession = () => {
      const session = localStorage.getItem('flip_session');
      const sessionTime = localStorage.getItem('flip_session_time');

      if (session && sessionTime) {
        const now = new Date().getTime();
        const sessionStart = parseInt(sessionTime);
        const thirtyMinutes = 30 * 60 * 1000;

        if (now - sessionStart < thirtyMinutes) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('flip_session');
          localStorage.removeItem('flip_session_time');
        }
      }

      setIsLoading(false); // Finaliza carregamento
    };

    checkSession();
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'flip' && password === '123456') {
      setIsAuthenticated(true);
      localStorage.setItem('flip_session', 'active');
      localStorage.setItem('flip_session_time', new Date().getTime().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('flip_session');
    localStorage.removeItem('flip_session_time');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
