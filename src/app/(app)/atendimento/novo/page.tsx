"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

// --- DADOS ESTÁTICOS PARA SIMULAÇÃO ---
const pacientes = [
  { id: 1, nome: "Ana Paula" },
  { id: 2, nome: "Marcos Rocha" },
  { id: 3, nome: "Juliana Costa" },
];
const medicos = [
  { id: 1, nome: "Dr. Carlos Andrade", especialidade: "Cardiologia" },
  { id: 2, nome: "Dra. Beatriz Lima", especialidade: "Dermatologia" },
  { id: 3, nome: "Dr. Ricardo Mendes", especialidade: "Ortopedia" },
];
// -----------------------------------------

export default function NovoAtendimentoPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();

  const handleSave = () => {
    // A lógica de salvar viria aqui
    console.log("Simulando salvamento do agendamento...");
    // Ação de feedback e navegação é feita pelo AlertDialog
  };

  return (
    <div className="mx-auto grid max-w-6xl flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/atendimento">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Novo Agendamento
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
             <Link href="/atendimento">Cancelar</Link>
          </Button>
           <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="sm" onClick={handleSave}>Agendar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Agendamento Confirmado!</AlertDialogTitle>
                    <AlertDialogDescription>
                        A solicitação de agendamento foi criada com sucesso. O paciente será notificado.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction asChild>
                         <Link href="/atendimento">Ok, entendi</Link>
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Atendimento</CardTitle>
              <CardDescription>
                Preencha as informações abaixo para criar uma nova solicitação.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="paciente">Paciente</Label>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o paciente" />
                        </SelectTrigger>
                        <SelectContent>
                            {pacientes.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.nome}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="medico">Médico</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o médico" />
                        </SelectTrigger>
                        <SelectContent>
                            {medicos.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.nome} ({m.especialidade})</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label>Data</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="horario">Horário</Label>
                    <Input id="horario" type="time" defaultValue="09:00" />
                 </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="queixa">Queixa Principal</Label>
                <Textarea id="queixa" placeholder="Descreva o problema ou motivo da consulta..." />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Tipo de Atendimento</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                     <Select defaultValue="consulta">
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="consulta">Consulta</SelectItem>
                            <SelectItem value="retorno">Retorno</SelectItem>
                            <SelectItem value="exame">Exame</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resumo</CardTitle>
                    <CardDescription>Revise as informações antes de salvar.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm">
                    <div className="flex justify-between"><span>Paciente:</span> <span>Ana Paula</span></div>
                    <div className="flex justify-between"><span>Médico:</span> <span>Dr. C. Andrade</span></div>
                    <div className="flex justify-between"><span>Data:</span> <span>10/10/2025</span></div>
                    <div className="flex justify-between"><span>Hora:</span> <span>14:30</span></div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}