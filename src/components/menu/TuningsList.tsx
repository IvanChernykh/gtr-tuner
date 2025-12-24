import { tunings, type Tuning } from "../../utils/constants";
import { EditIcon } from "../ui/icons/EditIcon";

interface TuningsListProps {
  customTuning: Tuning | null;
  openModal: () => void;
  handleItemClick: (id: string) => void;
}

export const TuningsList: React.FC<TuningsListProps> = ({
  customTuning,
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
      {gtrTunings?.map((item) => {
        return (
          <li key={item.id} onClick={() => handleItemClick(item.name)}>
            <a>{item.name}</a>
          </li>
        );
      })}
      <li className="border-b"></li>
      {bassTunings?.map((item) => {
        return (
          <li key={item.id} onClick={() => handleItemClick(item.name)}>
            <a>{item.name}</a>
          </li>
        );
      })}
      <li className="border-b"></li>
      {customTuning ? (
        <li className="flex justify-between items-center flex-row">
          <a
            className="w-38 block truncate pt-2.5"
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
