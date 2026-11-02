import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function AjustarZoom({ coordenadas }) {
  const map = useMap();

  useEffect(() => {
    if (coordenadas && coordenadas.length > 0) {
      map.fitBounds(coordenadas, { padding: [40, 40] });
    }
  }, [coordenadas, map]);

  return null;
}