
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Lock, User, Eye, EyeOff, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      if (!success) {
        setError('Usuário ou senha incorretos');
      }
    } catch (error) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-flip-blue-50 to-white flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="text-flip-red-500 border-flip-red-500 hover:bg-flip-red-50"
        >
          <Link to="/#inicio">
            <Home className="h-4 w-4 mr-2" />
            Ir para Hero
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-flip-blue-100">
        <div className="text-center mb-8">
          <div className="bg-flip-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Lock className="h-8 w-8 text-flip-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-flip-gray-900 mb-2">Área Restrita</h1>
          <p className="text-flip-gray-600">Acesso exclusivo para geração de propostas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-flip-gray-700">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-flip-gray-400" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 border-flip-blue-200 focus:border-flip-blue-500"
                placeholder="Digite seu usuário"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-flip-gray-700">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-flip-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 border-flip-blue-200 focus:border-flip-blue-500"
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-flip-gray-400 hover:text-flip-blue-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-flip-blue-500 hover:bg-flip-blue-600 text-white py-3"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
