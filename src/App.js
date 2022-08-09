import { useState } from "react";
import "./App.css";
import List from "./List";
import { v4 as uuidv4 } from "uuid";
function App() {
  let [data, setData] = useState("");
  let [items, setItems] = useState([]);
  let [updated, setUpdated] = useState("");
  let [display, setDisplay] = useState(true);
  let [length, setLength] = useState(0);
  let detailsNone = length === 0 ? "none" : "flex";

  const handleChange = (e) => {
    let a = e.target.value;

    setData(a);
  };
  const checkValue = (e) => {
    if (e.key === "Enter") {
      setItems((old) => {
        return [
          ...old,
          {
            id: uuidv4(),
            title: data,
          },
        ];
      });
      setLength((prev) => {
        return prev + 1;
      });
      setData("");
    }
  };

  const deleteItem = (obj) => {
    setItems((old) => {
      return old.filter((ele) => {
        return obj.id !== ele.id;
      });
    });
    if (length !== 0) {
      setLength((prev) => {
        return prev - 1;
      });
    }
  };

  const updateItem = (e) => {
    let a = e.target.value;
    setUpdated(a);
  };
  const checkUpdatedValue = (e, obj) => {
    if (e.key === "Enter") {
      setItems(
        items.map((ele) => {
          if (ele.id === obj.id) {
            return { ...ele, title: updated };
          }
          return ele;
        })
      );
    }
  };

  const isChecked = (e, obj) => {
    if (e.target.checked && length !== 0) {
      setLength((prev) => {
        return prev - 1;
      });
    } else {
      setLength((prev) => {
        return prev + 1;
      });
    }
  };
  return (
    <div className="todo">
      <header className="head">todos</header>
      <div className="main">
        <div className="search">
          <input
            type="text"
            value={data}
            placeholder="What needs to be done?"
            onChange={handleChange}
            onKeyPress={checkValue}
          ></input>
        </div>
        {display ? (
          <div className="list">
            {items.map((ele, index) => {
              return (
                <List
                  key={ele.id}
                  id={ele.id}
                  data={ele.title}
                  onSelect={deleteItem}
                  onUpdate={updateItem}
                  onChange={updateItem}
                  onKeyPress={checkUpdatedValue}
                  checked={isChecked}
                ></List>
              );
            })}
          </div>
        ) : (
          ""
        )}

        <div className={`footer`} style={{ display: detailsNone }}>
          <div className="totalItem">
            {length}
            {length === 1 ? " item left" : " items left"}
          </div>
          <div className="details">
            <button>All</button>
            <button
              onClick={() => {
                setDisplay(true);
              }}
            >
              Active
            </button>
            <button
              onClick={() => {
                setDisplay(false);
              }}
            >
              Completed
            </button>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
