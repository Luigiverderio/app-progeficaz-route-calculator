import { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { calcularRota, salvarFavorita } from "../../services/api";
import AjustarZoom from "../../components/AjustarZoom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

export default function TelaMapa() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [rota, setRota] = useState(null);
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState(null);
  const [nomeFavorita, setNomeFavorita] = useState("");
  const [msgFavorita, setMsgFavorita] = useState("");
  const [erroFavorita, setErroFavorita] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setMsgFavorita("");
    setErroFavorita("");

    if (!origem.trim() || !destino.trim()) {
      setErro("Preencha a origem e o destino.");
      return;
    }

    calcularRota(origem, destino)
      .then((data) => {
        setRota(data);
        setBusca({ origem, destino });
      })
      .catch((error) => {
        const status = error.response?.status;
        if (status === 400) {
          setErro("Preencha a origem e o destino.");
        } else if (status === 404) {
          setErro("Endereço não encontrado. Confira a origem e o destino.");
        } else if (status === 502) {
          setErro("O serviço de mapas está indisponível. Tente de novo em instantes.");
        } else if (status === 401) {
          setErro("Sua sessão expirou. Faça login de novo.");
        } else {
          setErro("Não foi possível calcular a rota. Tente novamente.");
        }
      });
  }

  function handleSalvarFavorita(event) {
    event.preventDefault();
    setMsgFavorita("");
    setErroFavorita("");

    if (!nomeFavorita.trim()) {
      setErroFavorita("Dê um nome para a favorita.");
      return;
    }

    salvarFavorita(
      nomeFavorita,
      busca.origem,
      busca.destino,
      Math.round(rota.duracao_min)
    )
      .then(() => {
        setMsgFavorita(`Favorita "${nomeFavorita}" salva!`);
        setNomeFavorita("");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setErroFavorita("Dados inválidos. Confira o nome da favorita.");
        } else {
          setErroFavorita("Não foi possível salvar a favorita. Tente novamente.");
        }
      });
  }

  return (
    <div>
      <div className="cabecalho">
        <h1>Mapa</h1>
        <Link to="/favoritas" className="link-botao">Minhas favoritas</Link>
      </div>

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

      {erro && <p style={{ color: "red", margin: "4px 0" }}>{erro}</p>}

      {rota && (
        <div style={{ marginBottom: "8px" }}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "4px 0" }}>
            Tempo de caminhada: {Math.round(rota.duracao_min)} min
          </p>
          <p style={{ margin: "4px 0" }}>
            Distância: {rota.distancia_km.toFixed(1)} km
          </p>

          <form
            onSubmit={handleSalvarFavorita}
            style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "8px" }}
          >
            <input
              placeholder="Nome da favorita (ex: Casa → Insper)"
              value={nomeFavorita}
              onChange={(e) => setNomeFavorita(e.target.value)}
            />
            <button type="submit">Salvar favorita</button>
          </form>

          {msgFavorita && <p style={{ color: "green", margin: "4px 0" }}>{msgFavorita}</p>}
          {erroFavorita && <p style={{ color: "red", margin: "4px 0" }}>{erroFavorita}</p>}
        </div>
      )}

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
          <>
            <Polyline
              positions={rota.coordenadas}
              pathOptions={{ color: "#1a73e8", weight: 5 }}
            />
            <Marker position={[rota.origem.lat, rota.origem.lng]}>
              <Popup>Origem</Popup>
            </Marker>
            <Marker position={[rota.destino.lat, rota.destino.lng]}>
              <Popup>Destino</Popup>
            </Marker>
            <AjustarZoom coordenadas={rota.coordenadas} />
          </>
        )}
      </MapContainer>
    </div>
  );
}