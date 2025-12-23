import React from "react";

export interface DropdownItem {
  id: string;
  component: React.ReactNode;
}

interface DropdownProps extends React.PropsWithChildren {
  onItemClick: (id: string) => void;
  renderItems?: (handleItemClick: (id: string) => void) => React.ReactNode;
  items?: DropdownItem[];
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  className,
  renderItems,
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
        className={`btn sm:btn-md btn-sm m-1 flex items-center ${
          className || ""
        }`}
      >
        {children}
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm z-50"
      >
        {renderItems
          ? renderItems(handleItemClick)
          : items?.map((item) => {
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
