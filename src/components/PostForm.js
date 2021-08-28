import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { CREATE_POST_MUTATION } from "../util/graphql";
export default function PostForm() {
  const { values, changeHandler, submitHandler } = useForm(createPostCallback, {
    body: "",
    comments: [],
    likes: [],
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      const newData = [result.data.createPost, ...data.getPosts];

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={submitHandler}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="hello world!"
            name="body"
            onChange={changeHandler}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="blue">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}
