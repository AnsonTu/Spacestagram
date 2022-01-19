import React from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface InfoPanelProps {
  isLoading: boolean;
  dateError: boolean;
  dateRangeError: boolean;
  likedPosts: string[];
  onDateChange: (newDate: string) => void;
  onStartDateChange: (newDate: string) => void;
  onEndDateChange: (newDate: string) => void;
  fetchPicturesWithDate: () => void;
  fetchPicturesWithDateRange: () => void;
}

const PanelContainer = styled.div`
  position: fixed;
  width: 440px;
  height: 296px;
  margin-top: 36px;
  margin-left: 136px;
  background-color: #eaf9f7;
  border: 2px solid #a9a9a9;
  border-radius: 16px;
`;

const PanelHeader = styled.h2`
  display: flex;
  justify-content: center;
  margin: 8px;
  font-weight: 700;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`;

const DateLabel = styled.h3`
  margin: 4px;
`;

const DatePicker = styled.input`
  width: 124px;
  height: 32px;
  margin-right: 8px;
  border-radius: 4px;
`;

const DateRangeContainer = styled.div`
  display: flex;
  padding-bottom: 16px;
`;

const LikesLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
`;

const UnlikedIcon = styled(FavoriteBorderIcon)`
  padding-top: 4px;
  padding-left: 4px;
`;

const LikedIcon = styled(FavoriteIcon)`
  color: red;
  padding-top: 4px;
  padding-left: 4px;
`;

const InfoPanel: React.FC<InfoPanelProps> = (props: InfoPanelProps) => {
  const {
    isLoading,
    dateError,
    dateRangeError,
    likedPosts,
    onDateChange,
    onStartDateChange,
    onEndDateChange,
    fetchPicturesWithDate,
    fetchPicturesWithDateRange,
  } = props;

  return (
    <PanelContainer>
      <PanelHeader>Welcome to Spacestagram!</PanelHeader>
      <DateContainer>
        <DateLabel>Search picture by date</DateLabel>
        <div style={{ display: "flex" }}>
          <DatePicker
            type="date"
            onChange={(e) => onDateChange(e.target.value)}
          />
          <button
            onClick={fetchPicturesWithDate}
            disabled={isLoading || dateError}
          >
            Find picture!
          </button>
        </div>
      </DateContainer>
      <DateContainer>
        <DateLabel>Search pictures from a range of dates</DateLabel>
        <DateRangeContainer>
          <DatePicker
            type="date"
            onChange={(e) => onStartDateChange(e.target.value)}
          />
          <DatePicker
            type="date"
            onChange={(e) => onEndDateChange(e.target.value)}
          />
          <button
            onClick={fetchPicturesWithDateRange}
            disabled={isLoading || dateRangeError}
          >
            Find pictures!
          </button>
        </DateRangeContainer>
      </DateContainer>
      <LikesLabel>
        Likes: {likedPosts.length}
        {likedPosts.length === 0 ? <UnlikedIcon /> : <LikedIcon />}
      </LikesLabel>
    </PanelContainer>
  );
};

export default InfoPanel;
