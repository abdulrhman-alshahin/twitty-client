import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../util/graphql";
export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { changeHandler, submitHandler, values } = useForm(loginUser, {
    username: "",
    password: "",
  });
  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  function loginUser() {
    addUser();
  }
  return (
    <>
      <h2 className="page-title">Login</h2>
      <div className="form-container">
        <Form
          noValidate
          onSubmit={submitHandler}
          className={loading ? "loading" : ""}
        >
          <Form.Input
            label="username"
            placeholder="username"
            type="text"
            name="username"
            value={values.username}
            onChange={changeHandler}
            error={errors.username ? true : false}
          />

          <Form.Input
            label="password"
            placeholder="password"
            type="password"
            name="password"
            value={values.password}
            onChange={changeHandler}
            error={errors.password ? true : false}
          />
          <Button type="submit" primary fluid>
            Login
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
