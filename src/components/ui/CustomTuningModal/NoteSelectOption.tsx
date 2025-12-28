import React from "react";

import { showSelectOptionDivider } from "./helpers";

interface Props {
  note: string;
}

export const NoteSelectOption: React.FC<Props> = ({ note }) => {
  if (showSelectOptionDivider(note)) {
    return (
      <>
        <option
          key={`${note}-divider`}
          className="divider my-0 before:content-none"
          disabled
        />
        <option key={note}>{note}</option>
      </>
    );
  }

  return <option key={note}>{note}</option>;
};
