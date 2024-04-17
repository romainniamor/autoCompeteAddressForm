import { useEffect, useState, useRef } from "react";
import "./App.css";
import { initialUserAddress } from "./config/userAddress";
import { inputsConfig } from "./config/inputsConfig";
import InputText from "./reusableUi/InputText";
import PrimaryButton from "./reusableUi/PrimaryButton";
import { MdLocationSearching } from "react-icons/md";
import { unDeliverablePlace } from "./utils/unDeliverablePlace";
import { loadScript, extractAddress } from "./utils/googleApi";

const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;
const mapApi = "https://maps.googleapis.com/maps/api/js";

function App() {
  const [userAddress, setUserAddress] = useState(initialUserAddress);
  const [isVisible, setIsVisble] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApi}?key=${apiKey}&libraries=places&v=weekly`;
    return loadScript(src);
  };

  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_components"]);
    autocomplete.addListener("place_changed", () => {
      onChangeAddress(autocomplete);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAddress({
      ...userAddress,
      [name]: value,
    });
  };

  const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
    const location = autocomplete.getPlace();
    setIsVisble(true);
    setUserAddress(extractAddress(location));
    searchInput.current.value = "";
  };

  useEffect(() => {
    initMapScript().then(() => {
      initAutocomplete();
      console.log("script loaded", window.google);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (unDeliverablePlace.includes(userAddress.zip)) {
      alert("Sorry we can deliver this location");
      return;
    }
    alert("Form submittet successfully!");
    console.log("user address for backend", userAddress);
    setUserAddress(initialUserAddress);
    setIsVisble(false);
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex justify-center items-center">
      <div className="relative w-80 border-4 rounded-lg shadow-lg border-slate-400 py-6 px-4 flex flex-col gap-4 bg-white">
        <div className="flex justify-between items-center gap-2 border-2 border-slate-400 rounded-md px-2 py-1">
          <input
            ref={searchInput}
            type="text"
            placeholder=" Find your address..."
            className="flex-1 outline-none"
          />
          <MdLocationSearching className="text-slate-400 text-lg" />
        </div>

        {isVisible && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {inputsConfig.map((input, index) => (
              <InputText
                key={index}
                input={input}
                onChange={handleChange}
                value={userAddress[input.name]}
              />
            ))}

            <PrimaryButton label="submit form" />
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
