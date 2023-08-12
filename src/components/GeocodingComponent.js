import React, { useEffect } from "react";
import axios from "axios";

const GeolocationComponent = () => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      const requestLocation = async () => {
        while (true) {
          try {
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
              const apiKey = "AIzaSyCeme5ngsB5BXH_mO3HdGGmwQ-JyDlzuSo";
              const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
              );

              const locationData = response?.data?.results[0];

              const FormattedAddress = locationData?.formatted_address || null;
              const regionData = locationData.address_components.find(
                (component) =>
                  component.types.includes("administrative_area_level_1") &&
                  component.types.includes("political")
              );
              const region = regionData?.long_name || null;
              const townData = locationData.address_components.find(
                (component) => component.types.includes("locality")
              );
              const villageData = locationData.address_components.find(
                (component) => component.types.includes("sublocality_level_2")
              );
              const town = townData?.long_name || null;
              const village = villageData?.long_name || null;

              let locationString = "";
              if (village) {
                locationString = village;
              } else if (town) {
                locationString = town;
              } else if (region) {
                locationString = region;
              }

              // console.log("Location details:", locationString);
              // console.log("Formatted address:", FormattedAddress);
              // console.log("Latitude:", latitude);
              // console.log("Longitude:", longitude);

              break;
            } catch (error) {
              console.error("Error getting geolocation details:", error);
              break;
            }
          } catch (error) {
            const userResponse = window.confirm(
              "We need your location for better user experience. Do you want to continue?"
            );
            if (!userResponse) {
              break;
            }
          }
        }
      };

      requestLocation();
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  return null;
};

export default GeolocationComponent;
