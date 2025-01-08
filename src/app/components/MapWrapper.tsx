"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

interface MapWrapperProps {
  posix: [number, number];
}

export default function MapWrapper({ posix }: MapWrapperProps) {
  return <Map posix={posix} />;
}
