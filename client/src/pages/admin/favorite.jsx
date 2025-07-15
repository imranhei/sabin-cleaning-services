import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuotes } from "@/redux/admin/quote-slice";
import SingleQuote from "@/components/SingleQuote";
import AllQuotes from "@/components/AllQuotes";

const Favorite = () => {
  const dispatch = useDispatch();
  const { quote } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(getQuotes({ favorite: true }));
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">Inbox</h1>
      {quote ? <SingleQuote /> : <AllQuotes />}
    </div>
  );
};

export default Favorite;
