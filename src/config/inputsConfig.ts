type InputType = {
  address: string;
  city: string;
  zip: string;
};

export const inputsConfig: InputType[] = [
  {
    type: "text",
    name: "number",
    placeholder: "number...",
  },
  {
    type: "text",
    name: "street",
    placeholder: "street...",
  },
  {
    type: "text",
    name: "city",
    placeholder: "city...",
  },
  {
    type: "text",
    name: "zip",
    placeholder: "zip code",
  },
  {
    type: "text",
    name: "country",
    placeholder: "country...",
  },
];
