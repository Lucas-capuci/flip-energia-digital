import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SystemUser {
  id: string;
  username: string;
  full_name: string;
  email?: string;
  is_active: boolean;
}

interface UserPermission {
  module_key: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: SystemUser | null;
  permissions: UserPermission[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (moduleKey: string, action?: 'view' | 'create' | 'edit' | 'delete') => boolean;
  refetchPermissions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SystemUser | null>(null);
  const [permissions, setPermissions] = useState<UserPermission[]>([]);

  const fetchUserPermissions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .select(`
          can_view,
          can_create,
          can_edit,
          can_delete,
          system_modules!inner (
            module_key
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      const userPermissions = data?.map(p => ({
        module_key: p.system_modules.module_key,
        can_view: p.can_view,
        can_create: p.can_create,
        can_edit: p.can_edit,
        can_delete: p.can_delete,
      })) || [];

      setPermissions(userPermissions);
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
      setPermissions([]);
    }
  };

  const refetchPermissions = async () => {
    if (user) {
      await fetchUserPermissions(user.id);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const sessionData = localStorage.getItem('flip_session');
      const sessionTime = localStorage.getItem('flip_session_time');

      if (sessionData && sessionTime) {
        const now = new Date().getTime();
        const sessionStart = parseInt(sessionTime);
        const thirtyMinutes = 30 * 60 * 1000;

        if (now - sessionStart < thirtyMinutes) {
          try {
            const userData = JSON.parse(sessionData);
            setUser(userData);
            setIsAuthenticated(true);
            await fetchUserPermissions(userData.id);
          } catch (error) {
            console.error('Erro ao restaurar sessão:', error);
            logout();
          }
        } else {
          logout();
        }
      }

      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Verificar credenciais usando uma edge function
      const { data, error } = await supabase.functions.invoke('auth-login', {
        body: { username, password }
      });

      if (error || !data?.success) {
        return false;
      }

      const userData = data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('flip_session', JSON.stringify(userData));
      localStorage.setItem('flip_session_time', new Date().getTime().toString());
      
      await fetchUserPermissions(userData.id);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPermissions([]);
    localStorage.removeItem('flip_session');
    localStorage.removeItem('flip_session_time');
  };

  const hasPermission = (moduleKey: string, action: 'view' | 'create' | 'edit' | 'delete' = 'view'): boolean => {
    const permission = permissions.find(p => p.module_key === moduleKey);
    if (!permission) return false;

    switch (action) {
      case 'view': return permission.can_view;
      case 'create': return permission.can_create;
      case 'edit': return permission.can_edit;
      case 'delete': return permission.can_delete;
      default: return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      user, 
      permissions, 
      login, 
      logout, 
      hasPermission,
      refetchPermissions 
    }}>
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