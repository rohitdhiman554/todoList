import React, { useState } from "react";

const List = (props) => {
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);

  let underLine = checked ? "underLine" : null;

  return (
    <div>
      <div className="main-items">
        <div className="checkBox">
          <input
            type="checkbox"
            value={checked}
            onChange={(e) => {
              setChecked(!checked);
              props.checked(e, props);
            }}
          ></input>
        </div>

        {edit ? (
          <input
            type="text"
            className={`title ${underLine}`}
            defaultValue={props.data}
            onChange={(e) => {
              props.onUpdate(e);
            }}
            onKeyPress={(e) => {
              props.onKeyPress(e, props);
              if (e.key === "Enter") {
                setEdit(!edit);
              }
            }}
          />
        ) : (
          <label
            className={`title ${underLine}`}
            onDoubleClick={() => {
              setEdit(!edit);
            }}
          >
            {props.data}
          </label>
        )}

        <button
          className="delete"
          onClick={() => {
            props.onSelect(props);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default List;
