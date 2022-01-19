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
  width: 480px;
  height: 400px;
  margin-top: 36px;
  margin-left: 144px;
  background-color: #eaf9f7;
  border: 2px solid #a9a9a9;
  border-radius: 16px;
`;

const PanelHeader = styled.h2`
  display: flex;
  justify-content: center;
  margin: 8px;
`;

const PanelDescription = styled.h4`
  margin: 4px 16px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 16px 8px;
`;

const DateLabel = styled.h3`
  margin: 4px 0 0;
`;

const DatePicker = styled.input<{ error: boolean }>`
  width: 124px;
  height: 32px;
  margin-right: 8px;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid black")};
  border-radius: 4px;
`;

const DateErrorText = styled.div<{ error: boolean }>`
  display: flex;
  color: ${(props) => (props.error ? "red " : "black")};
  font-size: 0.92em;
  margin-bottom: 4px;
`;

const InvalidDateText = styled.div`
  font-weight: 500;
  margin-left: 16px;
`;

const DatePickerContainer = styled.div`
  display: flex;
`;

const LikesLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  margin-top: 16px;
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

const OLDEST_DATE = "1995-06-16";
const PRESENT_DATE = new Date().toISOString().split("T")[0];

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
      <PanelDescription>
        Select a date to view that day's Picture of the Day, or select from a
        range of dates and view multiple Pictures at once. The earliest date is
        1995-06-16, and the latest date is today's date: {PRESENT_DATE}
      </PanelDescription>
      <DateContainer>
        <DateLabel>Search picture by date</DateLabel>
        <DateErrorText error={dateError}>
          {OLDEST_DATE} -- {PRESENT_DATE}
          {dateError && <InvalidDateText>Invalid date</InvalidDateText>}
        </DateErrorText>
        <DatePickerContainer>
          <DatePicker
            type="date"
            error={dateError}
            onChange={(e) => onDateChange(e.target.value)}
          />
          <button
            onClick={fetchPicturesWithDate}
            disabled={isLoading || dateError}
          >
            Find picture!
          </button>
        </DatePickerContainer>
      </DateContainer>
      <DateContainer>
        <DateLabel>Search pictures from a range of dates</DateLabel>
        <DateErrorText error={dateRangeError}>
          {OLDEST_DATE} -- {PRESENT_DATE}
          {dateRangeError && (
            <InvalidDateText>Invalid start or end date</InvalidDateText>
          )}
        </DateErrorText>
        <DatePickerContainer>
          <DatePicker
            type="date"
            error={dateRangeError}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
          <DatePicker
            type="date"
            error={dateRangeError}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
          <button
            onClick={fetchPicturesWithDateRange}
            disabled={isLoading || dateRangeError}
          >
            Find pictures!
          </button>
        </DatePickerContainer>
      </DateContainer>
      <LikesLabel>
        Likes: {likedPosts.length}
        {likedPosts.length === 0 ? <UnlikedIcon /> : <LikedIcon />}
      </LikesLabel>
    </PanelContainer>
  );
};

export default InfoPanel;
