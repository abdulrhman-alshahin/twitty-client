import { useState } from "react";

export const useForm = (callback, initState = {}) => {
  const [values, setValues] = useState(initState);
  const changeHandler = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    callback();
  };
  return { values, changeHandler, submitHandler };
};
