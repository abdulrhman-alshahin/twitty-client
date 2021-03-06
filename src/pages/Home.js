import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import PostCard from "../components/PostCard";
import { Card, Grid, Transition, Loader } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let posts;
  if (data) {
    posts = data.getPosts;
  }
  return (
    <Grid columns={3} doubling stackable style={{ marginTop: 10 }}>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Loader active />
        ) : (
          posts && (
            <>
              <Transition.Group duration={600}>
                {posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <Card.Group>
                      <PostCard post={post} />
                    </Card.Group>
                  </Grid.Column>
                ))}
              </Transition.Group>
            </>
          )
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
