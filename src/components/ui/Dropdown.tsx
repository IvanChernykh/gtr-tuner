import React from "react";

export interface DropdownItem {
  id: string;
  component: React.ReactNode;
}

interface DropdownProps extends React.PropsWithChildren {
  onItemClick: (id: string) => void;
  items: DropdownItem[];
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  className,
  onItemClick,
}) => {
  const handleItemClick = (id: string) => {
    onItemClick(id);

    if (document?.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className={`btn m-1 flex items-center ${className || ""}`}
      >
        {children}
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {items.map((item) => {
          return (
            <li key={item.id} onClick={() => handleItemClick(item.id)}>
              <a>{item.component}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
