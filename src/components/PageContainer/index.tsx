import React from "react";
import styled from "styled-components";
import InfoPanel from "../InfoPanel";

interface PageContainerProps {
  children: React.ReactNode;
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

const ContentColumn = styled.div`
  display: flex;
  justify-content: center;
  float: left;
  width: 33%;
  padding-top: 72px;
`;

const PageContainer: React.FC<PageContainerProps> = (
  props: PageContainerProps
) => {
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
    <>
      <ContentColumn>
        <InfoPanel
          isLoading={isLoading}
          dateError={dateError}
          dateRangeError={dateRangeError}
          likedPosts={likedPosts}
          onDateChange={onDateChange}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          fetchPicturesWithDate={fetchPicturesWithDate}
          fetchPicturesWithDateRange={fetchPicturesWithDateRange}
        />
      </ContentColumn>
      <ContentColumn>{props.children}</ContentColumn>
      <ContentColumn></ContentColumn>
    </>
  );
};

export default PageContainer;
