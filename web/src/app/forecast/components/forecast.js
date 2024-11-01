"use client";

import Layout from '@/components/layout';
import Map from './model/map';
import { ComboboxDemo } from "@/components/ui/combobox";
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
          <div className="p-4"> {/* Padding para o conteúdo  flex flex-col*/}
            <h2 className="mt-6 text-2xl">Previsão de incêndio</h2>
            <h2 className="mt-4">
              Data de início estimada:{" "}
              <span className="text-amber-700">
                {date ? date.toLocaleDateString() : "Selecionar uma data"}
              </span>
            </h2> <br/>

            <Calendar 
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            /> <br/>

            <h2>Probabilidade</h2>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-300" title="Baixa Probabilidade"></div>
                <span>25%</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500" title="Média Probabilidade"></div>
                <span>50%</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-600" title="Alta Probabilidade"></div>
                <span>75%</span>
            </div>
            <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-800" title="Extrema Probabilidade"></div>
                <span>85%</span>
            </div> <br/>

            <ComboboxDemo />

          </div>
        </main>
      </div>
    </Layout>
  );
}