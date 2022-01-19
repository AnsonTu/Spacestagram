import React from "react";
import Card from "../Card";
import { NasaPost } from "../interfaces";

interface CardListProps {
  isLoading: boolean;
  posts: NasaPost[];
  likedPosts: string[];
  updateLikedPosts: (post: string, shouldRemove: boolean) => void;
}

const CardList: React.FC<CardListProps> = (props: CardListProps) => {
  const { isLoading, posts, likedPosts, updateLikedPosts } = props;

  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
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
    </div>
  );
};

export default CardList;
