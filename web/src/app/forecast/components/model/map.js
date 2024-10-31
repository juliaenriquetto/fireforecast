import { useEffect, useRef } from 'react';
import L from 'leaflet';
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

        // Limpa o mapa quando o componente desmonta
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex justify-start w-full">
            <div id="map" className="h-[500px] w-[80%] mr-auto" style={{ height: '500px', width: '100%' }}></div>
        </div>
    );
}

MapComponent.displayName = "Map";

export { MapComponent };