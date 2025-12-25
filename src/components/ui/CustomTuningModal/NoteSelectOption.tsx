import React from "react";

import { showSelectOptionDivider } from "./helpers";

interface Props {
  note: string;
}

export const NoteSelectOption: React.FC<Props> = ({ note }) => {
  if (showSelectOptionDivider(note)) {
    return (
      <>
        <div key={`${note}-divider`} className="divider my-0"></div>
        <option key={note}>{note}</option>
      </>
    );
  }

  return <option key={note}>{note}</option>;
};
