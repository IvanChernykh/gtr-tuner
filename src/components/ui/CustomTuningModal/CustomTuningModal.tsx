import React, { useState } from "react";

import {
  customTuningDefault,
  isInputValid,
  selectNames,
  selectOptions,
} from "./helpers";
import { NoteSelectOption } from "./NoteSelectOption";
import { type Tuning } from "../../../utils/constants";
import { localStorageKeys } from "../../../utils/localStorage";

interface Props {
  ref: React.RefObject<HTMLDialogElement | null>;
  customTuning: Tuning | null;
  setCustomTuning: React.Dispatch<React.SetStateAction<Tuning | null>>;
}

export const CustomTuningModal: React.FC<Props> = ({
  ref,
  customTuning,
  setCustomTuning,
}) => {
  const [formData, setFormData] = useState<Tuning>(
    customTuning || customTuningDefault
  );

  const [inputValid, setInputValid] = useState(true);

  const handleTuningNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const isValid = isInputValid(value);

    setInputValid(isValid);

    if (value.length >= 25) {
      return;
    }

    setFormData({ ...formData, name: value });
  };

  const handleStringChange = (index: number, value: string) => {
    const newStrings = [...formData.notes];
    newStrings[index] = value;
    setFormData({ ...formData, notes: newStrings });
  };

  const handleSave = () => {
    localStorage.setItem(
      localStorageKeys.customTuning,
      JSON.stringify(formData)
    );

    setCustomTuning(formData);

    ref.current?.close();
  };

  const handleReset = () => {
    setFormData(customTuningDefault);
    setInputValid(true);
  };

  const onClose = () => {
    setTimeout(() => {
      setFormData(customTuning || customTuningDefault);
      setInputValid(true);
    }, 500);
  };

  return (
    <dialog id="my_modal_1" className="modal" ref={ref}>
      <div className="modal-box max-h-[90vh] flex flex-col">
        <div className="relative flex items-center justify-between mb-2 shrink-0">
          <h1 className="text-md xs:text-lg font-bold">Edit Custom Tuning</h1>
          <div className="modal-action mt-0">
            <form method="dialog">
              <button
                className="btn btn-sm xs:btn-md btn-circle btn-ghost"
                onClick={onClose}
              >
                ✕
              </button>
            </form>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 px-1">
          <fieldset>
            <legend className="fieldset-legend sm:text-base xs:text-sm text-xs">
              Tuning name
            </legend>
            <input
              type="text"
              placeholder="Tuning name"
              className={`input input-sm xs:input-md ${
                !inputValid ? "input-error" : "outline-0"
              } w-full mb-2`}
              value={formData.name}
              onChange={handleTuningNameChange}
            />
          </fieldset>

          {selectNames.map((label, idx) => (
            <fieldset key={idx}>
              <legend className="fieldset-legend sm:text-base xs:text-sm text-xs">
                {label}
              </legend>
              <select
                className="select w-full mb-2 xs:select-md select-sm"
                value={formData.notes[idx]}
                onChange={(e) => handleStringChange(idx, e.target.value)}
              >
                <option disabled>{label}</option>
                {selectOptions.map((note) => (
                  <NoteSelectOption note={note} />
                ))}
              </select>
            </fieldset>
          ))}
        </div>

        <div className="flex justify-between items-end mt-4 shrink-0">
          <button
            className="btn w-full max-w-[45%]"
            onClick={handleSave}
            disabled={!inputValid}
          >
            Save
          </button>
          <button
            className="btn btn-error w-full max-w-[45%]"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button className="cursor-auto" onClick={onClose}></button>
      </form>
    </dialog>
  );
};
