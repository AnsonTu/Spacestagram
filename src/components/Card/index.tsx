import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NasaPost } from "../interfaces";

interface CardProps {
  post: NasaPost;
  likedPosts: string[];
  updateLikedPosts: (post: string, shouldRemove: boolean) => void;
}

const CardContainer = styled.div`
  max-width: 86%;
  margin: 12px 0 12px 42px;
  border: 1px solid #000000;
  border-radius: 4px;
  background-color: #ffffff;
  @media (max-width: 768px) {
    margin: 12px auto;
  }
`;

const CardTitle = styled.h3`
  margin: 8px 0 8px 16px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 540px;
`;

const CardVideo = styled.iframe`
  width: 540px;
  height: 540px;
`;

const CardDescription = styled.p`
  linebreak: auto;
  margin: 8px 16px 24px;
`;

const ActionContainer = styled.div`
  display: flex;
  margin-top: 8px;
  margin-left: 16px;
`;

const ActionButton = styled(IconButton)`
  padding: 4px !important;
  margin-left: 8px !important;
`;

const LikedIcon = styled(FavoriteIcon)`
  color: red;
`;

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { likedPosts, post, updateLikedPosts } = props;

  const [likeStatus, setLikeStatus] = useState<boolean>(
    likedPosts.includes(post.date)
  );

  const handleLikeChange = (status: boolean) => {
    if (likeStatus) {
      updateLikedPosts(post.date, true);
    } else {
      updateLikedPosts(post.date, false);
    }
    setLikeStatus(status);
  };

  return (
    <CardContainer>
      <CardTitle>
        {post.title} - {post.date}
      </CardTitle>
      {post.media_type === "image" && (
        <CardImage src={post.url} alt={post.title} />
      )}
      {post.media_type === "video" && <CardVideo src={post.url} />}
      <ActionContainer>
        <ActionButton
          size="large"
          onClick={() => handleLikeChange(!likeStatus)}
        >
          {likeStatus ? <LikedIcon /> : <FavoriteBorderIcon />}
        </ActionButton>
      </ActionContainer>
      <CardDescription>{post.explanation}</CardDescription>
    </CardContainer>
  );
};

export default Card;
