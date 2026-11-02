import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export default function TelaMapa() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("origem:", origem, "destino:", destino);
  }

  return (
    <div>
      <h1>Mapa</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
      >
        <input
          placeholder="Origem (ex: Insper, São Paulo)"
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        />
        <input
          placeholder="Destino (ex: Parque Ibirapuera, São Paulo)"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <button type="submit">Calcular rota</button>
      </form>

      <MapContainer
        center={[-23.5505, -46.6333]}
        zoom={12}
        style={{ height: "75vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}