import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_POST_MUTATION } from "../util/graphql";
export default function LikeButton({ post: { likesCount, id, likes }, user }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  const likeButton = user ? (
    liked ? (
      <Button color="blue" size="tiny">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="blue" basic size="tiny">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="blue" basic size="tiny">
      <Icon name="heart" />
    </Button>
  );
  //   const toggleLike = () => {
  //     if (user) likePost();
  //   };
  return (
    <Button
      as="div"
      labelPosition="right"
      size="tiny"
      onClick={user && likePost}
    >
      {likeButton}
      <Label as="a" basic color="blue" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}
