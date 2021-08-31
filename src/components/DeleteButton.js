import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import {
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
  DELETE_COMMENT_MUTATION,
} from "../util/graphql";

export default function DeleteButton({ postId, callback, commentId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const backupData = { ...data };
        backupData.getPosts = data.getPosts.filter(
          (post) => post.id !== postId
        );
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: backupData });
      }
      callback && callback();
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <Button
        className="deleteButton"
        color="youtube"
        size="tiny"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}
