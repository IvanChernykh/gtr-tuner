import { tunings, type Tuning } from "../../utils/constants";

export const renderTuningsList = (
  handleItemClick: (id: string) => void
): React.ReactNode => {
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
          <li key={item.name} onClick={() => handleItemClick(item.name)}>
            <a>{item.name}</a>
          </li>
        );
      })}
      <li className="border-b"></li>
      {bassTunings?.map((item) => {
        return (
          <li key={item.name} onClick={() => handleItemClick(item.name)}>
            <a>{item.name}</a>
          </li>
        );
      })}
    </>
  );
};
