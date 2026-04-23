import { useGeoInfo } from "@/hooks/use-geo-info";
import React from "react";

export default function SetGeoInfo() {
  useGeoInfo();
  return <React.Fragment></React.Fragment>;
}
