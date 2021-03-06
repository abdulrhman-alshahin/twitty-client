import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Loader,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION } from "../util/graphql";
import { AuthContext } from "../context/auth";

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const postId = props.match.params.postId;
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });
  const deletePostCallBack = () => {
    props.history.push("/");
  };
  let postMarkup;

  if (loading) {
    postMarkup = <Loader active style={{ marginTop: 20 }}></Loader>;
  } else if (data) {
    const {
      id,
      body,
      createdAt,
      username,
      likesCount,

      likes,
      comments,
    } = data.getPost;
    postMarkup = (
      <Grid style={{ marginTop: 20 }} className="form-container">
        <Grid.Row>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Image
                  avatar
                  floated="right"
                  size="large"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description className="cardDescription">
                  {body}
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likesCount, likes }} />
                {/* <Button as="div" labelPosition="right" onClick={commentHandler}>
                  <Button basic color="blue" size="tiny">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentsCount}
                  </Label>
                </Button> */}
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallBack} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="comment..."
                      name="comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                    />
                    <Button
                      type="submit"
                      className="ui button blue"
                      disabled={comment.trim() === ""}
                      onClick={createComment}
                    >
                      <Icon name="comments" />
                    </Button>
                  </div>
                </Form>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}
