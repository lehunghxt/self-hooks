import React, { useState } from "react";

const useSelectedList = <T extends Partial<T>>(list: T[], selectedIndex: number[]) => {
  const [checkedState, setCheckedState] = useState<boolean[]>(list.map((_, index) => selectedIndex?.includes(index)));

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => (index == position ? !item : item));
    setCheckedState(updatedCheckedState);
  };
  const isSelected = React.useCallback((index: number) => {
    return checkedState[index];
  }, [checkedState]);
  return { handleOnChange, isSelected };
};

export default useSelectedList;
