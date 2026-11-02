import { MapContainer, TileLayer } from "react-leaflet";

export default function TelaMapa() {
  return (
    <div>
      <h1>Mapa</h1>
      <MapContainer
        center={[-23.5505, -46.6333]}
        zoom={12}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}