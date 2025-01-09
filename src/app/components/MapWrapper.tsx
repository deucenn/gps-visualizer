"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Modal from '@mui/material/Modal';

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>A map is loading...</p>,
  ssr: false,
});

const initialPositions: [number, number][] = [[40.7015, -74.01222]];

export default function MapWrapper() {
  const [positions, setPositions] = useState(initialPositions);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const addMarker = () => {
    const lastMarker = positions[positions.length - 1];
    const newMarker: [number, number] = [
      lastMarker[0] + 0.01,
      lastMarker[1] + 0.01,
    ];
    setPositions((prev) => [...prev, newMarker]);
  };

  return (
    <div className="h-full w-full"> 
      <Map markers={positions} />

      <button
        onClick={handleOpen}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200" 
      >
        <AddLocationIcon className="text-xl m-1" />
        Add marker
      </button>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div 
          className="
            fixed 
            top-1/2 
            left-1/2 
            -translate-x-1/2 
            -translate-y-1/2 
            bg-slate-800
            rounded-lg 
            shadow-md 
            p-6 
          "
        >
          {/* Your modal content here */}
          <h2 id="modal-title" className="text-lg font-semibold mb-2">Modal Title</h2>
          <p id="modal-description" className="text-gray-500">Some description of the modal.</p>
        </div>
      </Modal>
    </div>
  );
}