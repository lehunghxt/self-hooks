import FlatList from "flatlist-react/lib";
import React from "react";
import useSelectedList from "./hooks/useSelectedList";
import "./styles.css";
import { ITopping, toppings } from "./utils/toppings";
const getFormattedPrice = (price: number) => `$${price.toFixed(2)}`;

export default function App() {
  const { handleOnChange, isSelected } = useSelectedList<ITopping>(toppings, [1,2]);

  const renderItem = (item: ITopping, index: number) => {
    const handleOnlick = () => handleOnChange(index);
    const isChecked = isSelected(index);
    return <div onClick={handleOnlick}><Item key={index} index={index} item={item} isChecked={isChecked} /></div>
  };

  return (
    <div
      className="App"
      style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <ul className="toppings-list">
        <FlatList list={toppings} renderItem={renderItem} renderWhenEmpty={() => <div>List is empty!</div>} />
      </ul>
    </div>
  );
}

interface IItemProps {
  item: ITopping;
  isChecked: boolean;
  index: number;
}
const Item = React.memo(({ item, index, isChecked }: IItemProps) => {
  console.log('item.name___ => ', item.name, isChecked);
  return (
    <li style={{ padding: 8, background:'lightgray', margin:2, cursor: "pointer", userSelect:'none', width:500, listStyleType:'none', borderRadius: 12}}>
      <div className="toppings-list-item">
        <div className="left-section">
          <input
            type="checkbox"
            id={`custom-checkbox-${index}`}
            name={item.name}
            value={item.name}
            checked={isChecked}
          />
          <label htmlFor={`custom-checkbox123-${index}`}>{item.name}</label>
        </div>
        <div className="right-section">{getFormattedPrice(item.price)}</div>
      </div>
    </li>
  );
}, (prev, next) => prev.index === next.index && prev.isChecked === next.isChecked);
