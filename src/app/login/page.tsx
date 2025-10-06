"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para navegação
import Image from 'next/image';
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Ícones para os campos (melhora a usabilidade)
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o recarregamento da página

    if (!cpf || !password) {
      setError('Por favor, preencha o CPF e a senha.');
      return;
    }

    // Simulação de login
    console.log('Tentativa de login com:', { cpf, password });
    setError('');
    
    // Feedback visual para o usuário
    alert('Login simulado com sucesso! Redirecionando...');

    // Redireciona para a próxima tela (dashboard/atendimento)
    router.push('/atendimento');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md mx-4 p-2">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center mb-4">
            {/* Usando o componente Image do Next.js para otimização */}
            <Image 
              src="/logo.png" // Assumindo que você colocará o logo na pasta `public`
              alt="MedAgenda Logo" 
              width={60} 
              height={60}
              priority // Carrega a imagem prioritariamente
            />
            <h1 className="text-3xl font-bold text-blue-600 mt-2">MedAgenda</h1>
          </div>
          <CardTitle className="text-2xl">Acesse sua conta</CardTitle>
          <CardDescription>
            Insira seu CPF e senha para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                  className="pl-10" // Espaço para o ícone
                  aria-describedby="cpf-error"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10" // Espaço para ícones
                  aria-describedby="password-error"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <p id="cpf-error" className="text-sm text-red-600 bg-red-100 p-2 rounded-md text-center">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="font-normal text-gray-600">
                  Lembrar-me
                </Label>
              </div>
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
            
            <Button type="submit" className="w-full text-lg py-6">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}