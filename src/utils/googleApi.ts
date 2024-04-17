import { initialUserAddress, UserAddressType } from "../config/userAddress";

export const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
};

export const extractAddress = (place: UserAddressType) => {
  if (!place.address_components) return initialUserAddress;

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("street_number")) {
      initialUserAddress.number = value;
    }

    if (types.includes("route")) {
      initialUserAddress.street = value;
    }

    if (types.includes("locality")) {
      initialUserAddress.city = value;
    }

    if (types.includes("postal_code")) {
      initialUserAddress.zip = value;
    }

    if (types.includes("country")) {
      initialUserAddress.country = value;
    }
  });

  return initialUserAddress;
};
