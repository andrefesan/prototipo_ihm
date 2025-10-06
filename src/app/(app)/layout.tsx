// app/(app)/layout.tsx

import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Home,
  Users,
  Stethoscope,
  Building2,
  Settings,
  PanelLeft,
  Search,
  LogOut,
  ChevronDown,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Este componente envolve todas as páginas dentro do grupo (app)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // Dados estáticos para simulação
    const userName = "Dr. João Silva";
    const userRole = "Administrador";
    const userInitials = "JS";

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {/* === BARRA LATERAL (SIDEBAR) PARA DESKTOP === */}
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Image 
                src="/logo-icon.png" // Crie um logo só com o ícone para a sidebar
                width={24}
                height={24}
                alt="MedAgenda"
              />
              <span className="sr-only">MedAgenda</span>
            </Link>
            
            {/* Links de Navegação com Tooltips */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/atendimento"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Atendimentos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Atendimentos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/pacientes" // Futura página
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users className="h-5 w-5" />
                  <span className="sr-only">Pacientes</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Pacientes</TooltipContent>
            </Tooltip>

             <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/profissionais" // Futura página
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Stethoscope className="h-5 w-5" />
                  <span className="sr-only">Profissionais</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profissionais</TooltipContent>
            </Tooltip>
          </nav>
          
          {/* Menu de Configurações no final da Sidebar */}
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Configurações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Configurações</TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        {/* === CONTEÚDO PRINCIPAL E CABEÇALHO === */}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            
            {/* === MENU HAMBÚRGUER (SHEET) PARA MOBILE === */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                     <Image 
                        src="/logo-icon.png"
                        width={24}
                        height={24}
                        alt="MedAgenda"
                      />
                    <span className="sr-only">MedAgenda</span>
                  </Link>
                  <Link href="/atendimento" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Home className="h-5 w-5" />
                    Atendimentos
                  </Link>
                  <Link href="/pacientes" className="flex items-center gap-4 px-2.5 text-foreground">
                    <Users className="h-5 w-5" />
                    Pacientes
                  </Link>
                  <Link href="/profissionais" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Stethoscope className="h-5 w-5" />
                    Profissionais
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Settings className="h-5 w-5" />
                    Configurações
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Barra de Busca (Exemplo) */}
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            
            {/* === MENU DO USUÁRIO === */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{userRole}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                    </Link>
                 </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </header>
          
          {/* Onde o conteúdo da página será renderizado */}
          <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}