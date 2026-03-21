import { useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([position.lat, position.lng], map.getZoom());
  }, [position, map]);

  return null;
}

export default RecenterMap;
