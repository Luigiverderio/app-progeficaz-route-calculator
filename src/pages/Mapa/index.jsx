import { useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { calcularRota } from "../../services/api";

export default function TelaMapa() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [rota, setRota] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    calcularRota(origem, destino)
      .then((data) => {
        setRota(data);
        console.log("rota:", data);
      })
      .catch((error) => {
        console.error(error);
      });
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
        {rota && (
          <Polyline
            positions={rota.coordenadas}
            pathOptions={{ color: "#1a73e8", weight: 5 }}
          />
        )}
      </MapContainer>
    </div>
  );
}