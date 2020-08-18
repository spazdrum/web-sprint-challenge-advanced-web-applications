import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import useInput from "../utilities/useInput";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToCreate, setColorToCreate, handleColorToEdit] = useInput("");
  const [hexCode, setHexCode, handleHexCode] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      color: colorToCreate,
      code: { hex: hexCode },
    };

    axiosWithAuth()
      .post("/api/color", data)
      .then((res) => {
        updateColors(res.data);
      })
      .catch((err) => console.log("err", err.message));
  };

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const body = { ...colorToEdit };
  const id = colorToEdit.id;

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${id}`, body)
      .then((res) => {
        updateColors(
          colors.map((item) => (item.id === id ? colorToEdit : item))
        );
      })
      .catch((err) => console.log("err", err.message));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${id}`, color)
      .then((res) => console.log("res", res));
    document.location
      .reload(true)
      .catch((err) => console.log("err", err.message));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
