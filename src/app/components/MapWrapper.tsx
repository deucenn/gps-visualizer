"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>A map is loading...</p>,
  ssr: false,
});

const initialPositions: [number, number][] = [[40.70150, -74.01222]];

export default function MapWrapper() {
  const [positions, setPositions] = useState(initialPositions);

  const addMarker = () => {
    const lastMarker = positions[positions.length - 1];
    const newMarker: [number, number] = [
      lastMarker[0] + 0.01,
      lastMarker[1] + 0.01,
    ];
    setPositions((prev) => [...prev, newMarker]);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      
        <Map  markers={positions} /> 
      
      <button onClick={addMarker} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Add Marker
      </button>
    </div>
  );
}
