import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

export default function PostCard({
  post: {
    id,
    body,
    username,
    likesCount,
    commentsCount,
    createdAt,
    likes,
    comments,
  },
}) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="medium"
          avatar
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>@ {username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description className="cardDescription">{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ likesCount, id, likes }} />
        <Button as={Link} to={`/posts/${id}`} labelPosition="right" size="tiny">
          <Button color="grey" basic size="tiny">
            <Icon name="comments" />
          </Button>
          <Label basic color="grey" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {username === user?.username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
