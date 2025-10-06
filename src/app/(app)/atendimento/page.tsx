"use client";

import Link from "next/link";
import { PlusCircle, MoreHorizontal, FileDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- DADOS ESTÁTICOS PARA SIMULAÇÃO ---
// Em uma aplicação real, isso viria de uma API (useEffect, fetch, etc.)
const atendimentos = [
  {
    id: 1,
    paciente: "Ana Paula",
    medico: "Dr. Carlos Andrade",
    tipo: "CONSULTA",
    status: "AGENDADO",
    data: "2025-10-10",
    horario: "14:30",
  },
  {
    id: 2,
    paciente: "Marcos Rocha",
    medico: "Dra. Beatriz Lima",
    tipo: "RETORNO",
    status: "REALIZADO",
    data: "2025-10-08",
    horario: "11:00",
  },
  {
    id: 3,
    paciente: "Juliana Costa",
    medico: "Dr. Carlos Andrade",
    tipo: "EXAME",
    status: "CANCELADO",
    data: "2025-10-09",
    horario: "09:00",
  },
  {
    id: 4,
    paciente: "Roberto Dias",
    medico: "Dr. Ricardo Mendes",
    tipo: "CONSULTA",
    status: "AGENDADO",
    data: "2025-10-12",
    horario: "16:00",
  },
  {
    id: 5,
    paciente: "Fernanda Souza",
    medico: "Dra. Beatriz Lima",
    tipo: "CONSULTA",
    status: "REALIZADO",
    data: "2025-10-06",
    horario: "15:00",
  },
];
// -----------------------------------------

// Componente para estilizar o status
function StatusBadge({ status }: { status: string }) {
  const variant = {
    AGENDADO: "default",
    REALIZADO: "secondary",
    CANCELADO: "destructive",
  }[status] as "default" | "secondary" | "destructive" | null | undefined;

  return <Badge variant={variant}>{status}</Badge>;
}

export default function AtendimentoPage() {
  return (
    <Tabs defaultValue="todos">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="agendados">Agendados</TabsTrigger>
          <TabsTrigger value="realizados">Realizados</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <FileDown className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Exportar
            </span>
          </Button>
          <Link href="/atendimento/novo">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Atendimento
              </span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Conteúdo da aba "Todos" */}
      <TabsContent value="todos">
        <Card>
          <CardHeader>
            <CardTitle>Atendimentos</CardTitle>
            <CardDescription>
              Gerencie todos os atendimentos agendados, realizados e cancelados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead>
                    <span className="sr-only">Ações</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atendimentos.map((atendimento) => (
                  <TableRow key={atendimento.id}>
                    <TableCell className="font-medium">
                      {atendimento.paciente}
                    </TableCell>
                    <TableCell>{atendimento.medico}</TableCell>
                    <TableCell>
                      <StatusBadge status={atendimento.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {atendimento.tipo}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(atendimento.data).toLocaleDateString("pt-BR", {timeZone: 'UTC'})} às {atendimento.horario}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver Prontuário</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Aqui você pode adicionar o conteúdo para as outras abas, filtrando a lista */}
      <TabsContent value="agendados">
        {/* ... Tabela apenas com atendimentos agendados ... */}
        <p className="p-4 text-center text-muted-foreground">
          Tabela com atendimentos agendados viria aqui.
        </p>
      </TabsContent>
       <TabsContent value="realizados">
        {/* ... Tabela apenas com atendimentos realizados ... */}
        <p className="p-4 text-center text-muted-foreground">
          Tabela com atendimentos realizados viria aqui.
        </p>
      </TabsContent>
    </Tabs>
  );
}