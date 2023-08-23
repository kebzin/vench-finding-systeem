import React, { useEffect, useState } from "react";
import axios from "axios";

const GeolocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [region, setRegion] = useState(null);
  const [town, setTown] = useState(null);
  const [village, setVillage] = useState(null);
  const [formatAddress, setFormatedAddress] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Get the user's geolocation
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLatitude(position?.coords.latitude);
            setLongitude(position?.coords.longitude);
            // Make a request to the Google Maps Geocoding API
            const apiKey = "AIzaSyCeme5ngsB5BXH_mO3HdGGmwQ-JyDlzuSo";
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.coords.latitude},${position?.coords.longitude}&key=${apiKey}`
            );

            // Extract the relevant location details from the API response
            const locationData = response?.data?.results[0];

            setFormatedAddress(locationData.formatted_address);

            // Extract the region (administrative_area_level_1)
            const regionData = locationData.address_components.find(
              (component) =>
                component.types.includes("administrative_area_level_1") &&
                component.types.includes("political")
            );
            const region = regionData?.long_name || null;
            setRegion(region);

            // Extract the town (locality) and village (sublocality_level_2)
            const townData = locationData.address_components.find((component) =>
              component.types.includes("locality")
            );
            const villageData = locationData.address_components.find(
              (component) => component.types.includes("sublocality_level_2")
            );
            const town = townData?.long_name || null;
            const village = villageData?.long_name || null;
            setTown(town);
            setVillage(village);

            // Build the location string based on the available information
            let locationString = "";
            if (village) {
              locationString = village;
            } else if (town) {
              locationString = town;
            } else if (region) {
              locationString = region;
            }

            setLocationDetails(locationString);
          } catch (error) {
            console.error("Error getting geolocation details:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, [latitude, longitude]);

  // Return the geolocation data as an object
  return {
    latitude,
    longitude,
    locationDetails,
    region,
    town,
    village,
    formatAddress,
  };
};

export default GeolocationComponent;
