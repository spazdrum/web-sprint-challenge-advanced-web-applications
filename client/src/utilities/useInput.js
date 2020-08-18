import React, { useState } from "react";

const useInput = (props) => {
  const [state, setState] = useState(props);
  const handleChange = (updatedValue) => {
    setState(updatedValue);
    console.log("updatedValue", state);
  };
  return [state, setState, handleChange];
};

export default useInput;
