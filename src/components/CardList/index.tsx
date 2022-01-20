import React from "react";
import styled from "styled-components";
import Card from "../Card";
import { NasaPost } from "../interfaces";

interface CardListProps {
  isLoading: boolean;
  posts: NasaPost[];
  likedPosts: string[];
  updateLikedPosts: (post: string, shouldRemove: boolean) => void;
}

const CardListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CardList: React.FC<CardListProps> = (props: CardListProps) => {
  const { isLoading, posts, likedPosts, updateLikedPosts } = props;

  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <CardListContainer>
      {posts
        .slice(0)
        .reverse()
        .map((post) => (
          <Card
            key={`apod-${post.title}`}
            post={post}
            likedPosts={likedPosts}
            updateLikedPosts={updateLikedPosts}
          />
        ))}
    </CardListContainer>
  );
};

export default CardList;
