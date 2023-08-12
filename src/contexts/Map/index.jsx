import React, { createContext, useContext, useState } from "react";
import L from "leaflet";
import { api, baseURL } from "../../services/api";
import { toast } from "react-toastify";

const MapContext = createContext({});

export function MapProvider({ children }) {
  const defaultPlace = {
    name: "",
    position: [],
    icon: {
      file: "",
      size: [],
    },
    images: [],
    videos: [],
    title: "",
    text: "",
  };
  const [currentPlace, setCurrentPlace] = useState(defaultPlace);
  const [places, setPlaces] = useState([defaultPlace]);
  const [icons, setIcons] = useState([]);
  const [icon, setIcon] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [latlng, setLatlng] = useState(null);

  const loadIcons = async () => {
    try {
      const { data } = await api.get("/icons");
      setIcons(data);
    } catch (error) {
      toast.error("Ocorreu um erro durante o carregamento");
    }
  };

  const getIcon = (iconFile, iconSize) => {
    return L.icon({
      iconUrl: `${baseURL}/files/icons/id/${iconFile}`,
      iconSize: iconSize && iconSize.length ? iconSize : [45, 45],
    });
  };

  const loadPlaces = async () => {
    try {
      const response = await api.get(`/places`);
      const { data } = response;
      setPlaces(data);
    } catch (error) {
      toast.error("Ocorreu um erro durante o carregamento");
    }
  };

  return (
    <MapContext.Provider
      value={{
        defaultPlace,
        currentPlace,
        setCurrentPlace,
        places,
        setPlaces,
        newMarker,
        setNewMarker,
        latlng,
        setLatlng,
        icons,
        icon,
        setIcon,
        loadIcons,
        getIcon,
        loadPlaces,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);

  return context;
}
