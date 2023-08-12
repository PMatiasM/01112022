import React from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { useMap } from "../../../contexts/Map";

export default function MapHandler() {
  const { icon, getIcon, setNewMarker, setLatlng } = useMap();
  const map = useMapEvents({
    click(event) {
      if (icon) {
        map.setView(event.latlng);
        setLatlng(event.latlng);
        setNewMarker(<Marker icon={getIcon(icon.file, icon.size)} position={event.latlng} />);
      }
    },
  });
}
