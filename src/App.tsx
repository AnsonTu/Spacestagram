import { useEffect, useState } from "react";
import HeaderBar from "./components/HeaderBar";
import PageContainer from "./components/PageContainer";
import CardList from "./components/CardList";
import { NasaPost } from "./components/interfaces";

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const PRESENT_DATE = new Date().toISOString().split("T")[0];
const OLDEST_DATE = "1995-06-16";
const PLACEHOLDER_DATE = "2999-12-31";

const App = () => {
  const [date, setDate] = useState<string>(PLACEHOLDER_DATE);
  const [startDate, setStartDate] = useState<string>(PLACEHOLDER_DATE);
  const [endDate, setEndDate] = useState<string>(PLACEHOLDER_DATE);
  const [dateError, setDateError] = useState<boolean>(true);
  const [dateRangeError, setDateRangeError] = useState<boolean>(true);
  const [posts, setPosts] = useState<NasaPost[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDateChange = (newDate: string) => {
    setDate(newDate);
    newDate > PRESENT_DATE || newDate < OLDEST_DATE
      ? setDateError(true)
      : setDateError(false);
  };

  const onStartDateChange = (newDate: string) => {
    setStartDate(newDate);
    newDate > PRESENT_DATE ||
    endDate > PRESENT_DATE ||
    endDate < OLDEST_DATE ||
    newDate < OLDEST_DATE ||
    newDate > endDate
      ? setDateRangeError(true)
      : setDateRangeError(false);
  };

  const onEndDateChange = (newDate: string) => {
    setEndDate(newDate);
    newDate > PRESENT_DATE ||
    startDate > PRESENT_DATE ||
    startDate < OLDEST_DATE ||
    newDate < OLDEST_DATE ||
    newDate < startDate
      ? setDateRangeError(true)
      : setDateRangeError(false);
  };

  const updateLikedPosts = (post: string, shouldRemove: boolean) => {
    let updatedPosts: string[] = [];
    if (shouldRemove) {
      updatedPosts = likedPosts.filter((p) => p !== post);
    } else {
      updatedPosts = [...likedPosts, post];
    }
    setLikedPosts(updatedPosts);
    localStorage.setItem("likedPosts", JSON.stringify(updatedPosts));
  };

  const fetchPicturesWithDate = () => {
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setPosts([data]))
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err));
  };

  const fetchPicturesWithDateRange = () => {
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
      .then((response) => response.json())
      .then((data) => setPosts([data]))
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err));

    const localStorageLikedPosts = localStorage.getItem("likedPosts");
    localStorageLikedPosts && setLikedPosts(JSON.parse(localStorageLikedPosts));
  }, []);

  return (
    <>
      <HeaderBar />
      <PageContainer
        isLoading={isLoading}
        dateError={dateError}
        dateRangeError={dateRangeError}
        likedPosts={likedPosts}
        onDateChange={onDateChange}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        fetchPicturesWithDate={fetchPicturesWithDate}
        fetchPicturesWithDateRange={fetchPicturesWithDateRange}
      >
        <CardList
          isLoading={isLoading}
          posts={posts}
          likedPosts={likedPosts}
          updateLikedPosts={updateLikedPosts}
        />
      </PageContainer>
    </>
  );
};

export default App;
