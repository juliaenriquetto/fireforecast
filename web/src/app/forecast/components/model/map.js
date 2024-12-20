"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
    const mapRef = useRef(null);
    const [L, setL] = useState(null); // Estado para armazenar o módulo Leaflet

    useEffect(() => {
        // Importa o Leaflet dinamicamente apenas no lado do cliente
        const loadLeaflet = async () => {
            const leaflet = await import('leaflet');
            setL(leaflet); // Armazena o módulo Leaflet no estado
        };

        loadLeaflet();
    }, []);

    useEffect(() => {
        if (L && mapRef.current === null) {
            // Inicializa o mapa quando o Leaflet estiver carregado
            mapRef.current = L.map('map').setView([-23.5505, -46.6333], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);

            loadMarkersFromCSV();
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [L]);

    const loadMarkersFromCSV = async () => {
        const csvUrl = '/dados.csv';
    
        try {
            const response = await fetch(csvUrl);
            const csvText = await response.text();
    
            if (L) {
                const Papa = await import('papaparse');
                Papa.parse(csvText, {
                    header: true,
                    delimiter: ",",
                    complete: function (results) {
                        console.log("Dados lidos do CSV:", results.data);
    
                        results.data.forEach((row, index) => {
                            // Log the entire row for debugging
                            console.log(`Row ${index + 1}:`, row);
    
                            // Validate and parse values
                            const latitude = parseFloat(row.latitude);
                            const longitude = parseFloat(row.longitude);
                            const probabilidade = parseFloat(row.probabilidade);
    
                            if (
                                !isNaN(latitude) &&
                                !isNaN(longitude) &&
                                !isNaN(probabilidade) &&
                                latitude !== undefined &&
                                longitude !== undefined &&
                                probabilidade !== undefined
                            ) {
                                // Determine the color based on 'probabilidade'
                                let color;
                                if (probabilidade <= 25) color = 'lightyellow';
                                else if (probabilidade <= 50) color = 'gold';
                                else if (probabilidade <= 75) color = 'orange';
                                else if (probabilidade <= 85) color = 'red';
                                else color = 'darkred';
    
                                // Add a circle marker to the map
                                L.circle([latitude, longitude], {
                                    color,
                                    radius: 5000,
                                    fillOpacity: 0.5,
                                }).addTo(mapRef.current);
                            } else {
                                // Log details of invalid rows
                                console.warn(
                                    `Valores inválidos na linha ${index + 1}:`,
                                    row,
                                    { latitude, longitude, probabilidade }
                                );
                            }
                        });
                    },
                });
            }
        } catch (error) {
            console.error("Erro ao carregar ou processar o CSV:", error);
        }
    };

    return (
        <div className="flex justify-start w-full">
            <div id="map" className="h-[500px] w-[80%] mr-auto" style={{ height: '500px', width: '100%' }}></div>
        </div>
    );
}

MapComponent.displayName = "Map";

export { MapComponent };