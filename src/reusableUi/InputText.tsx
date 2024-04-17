import React from "react";

type InputType = {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function InputText({ input, onChange, value }: InputType) {
  return (
    <input
      type={input.type}
      placeholder={input.placeholder}
      name={input.name}
      value={value}
      onChange={onChange}
      className="border-2 border-slate-400 rounded-md px-2 py-1 text-slate-800"
    />
  );
}
