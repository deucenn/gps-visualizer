"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import { Snackbar } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>A map is loading...</p>,
  ssr: false,
});

interface MarkerData {
  position: [number, number];
  name: string;
}

const initialPositions: MarkerData[] = [
  { position: [40.7015, -74.01222], name: "Initial Marker" },
];

export default function MapWrapper() {
  const [positions, setPositions] = useLocalStorage('gpsData', initialPositions);;
  const [openModal, setOpenModal] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [markerName, setMarkerName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteMarker, setDeleteMarker] = useState<MarkerData | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleDeleteModalOpen = (marker: MarkerData) => {
    setOpenDeleteModal(true);
    setDeleteMarker(marker);
  };
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setDeleteMarker(null);
  };

  const handleDeleteMarker = () => {
    if (!deleteMarker) return;

    const newPositions = positions.filter(
      (marker) =>
        marker.position[0] !== deleteMarker.position[0] &&
        marker.position[1] !== deleteMarker.position[1]
    );
    setPositions(newPositions);
    setOpenDeleteModal(false);
    setDeleteMarker(null);
    setSnackbarMessage(`Marker deleted: ${deleteMarker.name}`);
  };

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLatitude(event.target.value);
  const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLongitude(event.target.value);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMarkerName(event.target.value);

  const addMarker = () => {
    if (!latitude || !longitude) return;

    const newMarker: MarkerData = {
      position: [parseFloat(latitude), parseFloat(longitude)],
      name: markerName,
    };

    setPositions((prev) => [...prev, newMarker]);
    setOpenModal(false);
    setLatitude("");
    setLongitude("");
    setMarkerName("");
    handleClose();

    setSnackbarMessage(`Marker added: ${markerName}`);
    setTimeout(() => setSnackbarMessage(null), 3000);
  };

  return (
    <div className="h-full w-full font-sans">
      <Map markers={positions} />

      <button
        onClick={handleOpen}
        className="mt-4 px-4 py-2 hover:bg-slate-600 text-white rounded transition-colors duration-200 mr-2"
      >
        <AddLocationIcon className="text-xl m-1" />
        Add marker
      </button>
      <button
        className="mt-4 px-4 py-2 hover:bg-slate-600 text-white rounded transition-colors duration-200"
      >
        <ShapeLineIcon className="text-xl m-1" />
        Add shape
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
          <h2 id="modal-title" className="text-lg font-semibold mb-2">
            Input your GPS data
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField
              id="outlined-basic"
              label="Latitude"
              onChange={handleLatitudeChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Focused border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiOutlinedInput-input": {
                  color: "white", // Input text color
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Longitude"
              onChange={handleLongitudeChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Focused border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiOutlinedInput-input": {
                  color: "white", // Input text color
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Name"
              className="md:col-span-2"
              value={markerName}
              onChange={handleNameChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Focused border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiOutlinedInput-input": {
                  color: "white", // Input text color
                },
              }}
            />
          </div>
          <Avatar className="mt-4 hover:cursor-pointer" onClick={addMarker}>
            <AddIcon />
          </Avatar>
        </div>
      </Modal>
      <div className="pt-3 border-t-2 mt-4">
        <h1 className="text-xl font-sans">All markers</h1>
        <div className="grid grid-cols-1 gap-4 w-1/2">
          {positions.map((marker, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-slate-600 rounded transition hover:text-slate-900 duration-200 hover:cursor-pointer"
              onClick={() => handleDeleteModalOpen(marker)}
            >
              <p className="font-medium">{marker.name}</p>
              <p className="text-gray-300">{`Lat: ${marker.position[0]}, Lng: ${marker.position[1]}`}</p>
            </div>
          ))}
        </div>

        {/* Delete Modal */}
        <Modal
          open={openDeleteModal}
          onClose={handleDeleteModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-lg shadow-md p-6">
            <h2 id="modal-title" className="text-lg font-semibold mb-2">
              Do you really want to delete the marker {deleteMarker?.name}?
            </h2>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
                onClick={handleDeleteMarker}
              >
                Delete
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
                onClick={handleDeleteModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
      />
    </div>
  );
}
