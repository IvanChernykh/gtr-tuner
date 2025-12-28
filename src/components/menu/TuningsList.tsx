import { tunings, type Tuning } from "../../utils/constants";
import { EditIcon } from "../ui/icons/EditIcon";

interface TuningsListProps {
  customTuning: Tuning | null;
  selectedTuning: Tuning;
  openModal: () => void;
  handleItemClick: (id: string) => void;
}

const getActiveBtnClassName = (selected: string, current: string): string =>
  selected === current ? "bg-base-200 rounded-md" : "";

export const TuningsList: React.FC<TuningsListProps> = ({
  customTuning,
  selectedTuning,
  openModal,
  handleItemClick,
}) => {
  const gtrTunings: Tuning[] = [];
  const bassTunings: Tuning[] = [];

  tunings.forEach((item) =>
    item.name.toLowerCase().includes("bass")
      ? bassTunings.push(item)
      : gtrTunings.push(item)
  );

  return (
    <>
      {gtrTunings?.map(({ id, name }) => {
        return (
          <li
            key={id}
            onClick={() => handleItemClick(name)}
            className={getActiveBtnClassName(selectedTuning.name, name)}
          >
            <a>{name}</a>
          </li>
        );
      })}
      <li className="border-b"></li>
      {bassTunings?.map(({ id, name }) => {
        return (
          <li
            key={id}
            onClick={() => handleItemClick(name)}
            className={getActiveBtnClassName(selectedTuning.name, name)}
          >
            <a>{name}</a>
          </li>
        );
      })}
      <li className="border-b"></li>
      {customTuning ? (
        <li className="flex justify-between items-center flex-row">
          <a
            className={`w-38 block truncate pt-2.5 ${getActiveBtnClassName(
              selectedTuning.name,
              customTuning.name
            )}`}
            onClick={() => handleItemClick(customTuning.name)}
          >
            {customTuning.name}
          </a>

          <button className="btn btn-ghost btn-sm" onClick={openModal}>
            <EditIcon />
          </button>
        </li>
      ) : (
        <button className="btn btn-success" onClick={openModal}>
          Add Custom Tuning
        </button>
      )}
    </>
  );
};
