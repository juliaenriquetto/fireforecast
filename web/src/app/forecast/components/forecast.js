"use client";

import Layout from '@/components/layout';
import Map from './model/map';
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

export default function Forecast() {
  const [date, setDate] = React.useState(new Date());

  return (
    <Layout className="h-full w-full justify-start">
      <div className="flex min-h-screen w-full items-start justify-start py-10">
        <main className="relative flex w-full flex-col md:flex-row">
          {/* Mapa ocupando metade da tela */}
          <div className="flex-1 p-4"> {/* Adicionando padding ao contêiner do mapa */}
            <Map />
          </div>

          {/* Conteúdo ocupando a outra metade da tela */}
          <div className="flex-1 flex flex-col p-4"> {/* Padding para o conteúdo */}
            <h2 className="mt-6">Previsão de incêndio</h2>
            <h2 className="mt-4">
              Data de início estimada:{" "}
              <span className="text-amber-700">
                {date ? date.toLocaleDateString() : "Selecionar uma data"}
              </span>
            </h2>
            <Calendar 
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full" // Mantém o calendário com a largura total
            />
          </div>
        </main>
      </div>
    </Layout>
  );
}
