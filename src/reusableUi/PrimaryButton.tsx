import React from "react";

type PrimaryButtonType = {
  label: string;
  onClick?: () => void;
};

export default function PrimaryButton({ label, onClick }: PrimaryButtonType) {
  return (
    <button
      onClick={onClick}
      className=" px-3 py-2 shadow-md bg-slate-600 rounded-md text-white hover:bg-slate-500 active:bg-slate:600"
    >
      {label}
    </button>
  );
}
