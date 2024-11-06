"use client"

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
    const mapRef = useRef(null);

    useEffect(() => {
        // Verifique se o mapa já foi criado
        if (mapRef.current === null) {
            mapRef.current = L.map('map').setView([-23.5505, -46.6333], 10); // ref.: loc de sp

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);
        }

        // Carrega os dados do CSV e adiciona bolinhas
        loadMarkersFromCSV();

        // Limpa o mapa quando o componente desmonta
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const loadMarkersFromCSV = async () => {
        const csvUrl = '/dados.csv'; // Ajuste o caminho para o seu arquivo CSV
    
        const response = await fetch(csvUrl);
        const csvText = await response.text();
    
        Papa.parse(csvUrl, {
            download: true,
            header: true,
            complete: function (results) {
              console.log("Dados lidos do CSV:", results.data);
              results.data.forEach((row) => {
                const latitude = parseFloat(row.latitude);
                const longitude = parseFloat(row.longitude);
                const probabilidade = parseFloat(row.confidence);
          
                // Verifica se os valores são válidos antes de criar o marcador
                if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(probabilidade)) {
                  // Define a cor de acordo com os novos intervalos de probabilidade
                  let color;
                  if (probabilidade <= 25) {
                    color = 'lightyellow';
                  } else if (probabilidade > 25 || probabilidade <= 50) {
                    color = 'gold';
                  } else if (probabilidade > 50 || probabilidade <= 75) {
                    color = 'orange';
                  } else if (probabilidade > 75 || probabilidade <= 85) {
                    color = 'red';
                  }
          
                  // Adiciona o círculo ao mapa com a cor e raio definidos
                  L.circle([latitude, longitude], {
                    color,
                    radius: 5000,
                    fillOpacity: 0.5,
                  }).addTo(mapRef.current);
                } else {
                  console.error("Valores inválidos:", { latitude, longitude, probabilidade });
                }
              });
            },
          });          
    };

    return (
        <div className="flex justify-start w-full">
            <div id="map" className="h-[500px] w-[80%] mr-auto" style={{ height: '500px', width: '100%' }}></div>
        </div>
    );
}

MapComponent.displayName = "Map";

export { MapComponent };