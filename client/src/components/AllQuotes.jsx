import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Star,
  Trash2Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getQuote, getQuotes, updateQuote } from "@/redux/admin/quote-slice";
import DeleteModal from "@/components/modal/DeleteModal";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const AllQuotes = () => {
  const dispatch = useDispatch();
  const { quotes } = useSelector((state) => state.quote);
  const [ids, setIds] = useState([]);
  console.log(quotes);

  const dateFormatter = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const toggleSelectAll = (checked) => {
    if (checked) {
      const allIds = quotes.map((q) => q._id);
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  const toggleSingle = (id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = ids.length > 0 && ids.length === quotes.length;

  const handleToggleFavorite = (item) => {
    dispatch(updateQuote({ id: item._id, favorite: !item.favorite }));
  };

  return (
    <div className="flex flex-col border rounded-md shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center p-3 h-14">
        <div className="flex gap-2 items-center z-20">
          <Checkbox
            className="w-4 h-4"
            checked={isAllSelected}
            onCheckedChange={toggleSelectAll}
          />
          {ids.length > 0 && (
            <DeleteModal ids={ids} setIds={setIds} resetIds={false}>
              <Button
                variant="destructive"
                size="sm"
                className="rounded-full px-3"
              >
                <Trash2Icon className="w-4 h-4" /> ({ids.length})
              </Button>
            </DeleteModal>
          )}
          <RotateCcw
            className="w-4 h-4 cursor-pointer"
            onClick={() => dispatch(getQuotes())}
          />
        </div>
        <div className="flex gap-2 items-center text-sm">
          <p>1 - 50 of {quotes.length}</p>
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
        </div>
      </div>

      {/* Quote List */}
      <div className="flex flex-col">
        {quotes.map((item) => (
          <div
            key={item._id}
            className="flex gap-2 items-center p-3 border-t min-w-0 z-0 cursor-pointer hover:bg-gray-100"
            onClick={() => dispatch(getQuote(item._id))}
          >
            <div
              onClick={(e) => e.stopPropagation()} // stop parent onClick
            >
              <Checkbox
                className="w-4 h-4 z-20"
                checked={ids.includes(item._id)}
                onCheckedChange={() => toggleSingle(item._id)}
              />
            </div>
            <Star
              className={`size-5 z-20 ${
                item?.favorite ? "fill-yellow-300" : "hover:fill-yellow-300"
              } text-yellow-400`}
              onClick={(e) => {
                  handleToggleFavorite(item);
                  e.stopPropagation();
              }}
            />
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <p
                className={`sm:w-32 w-24 pr-4 truncate ${
                  item.status !== "read" ? "font-bold" : ""
                }`}
              >
                {item.name}
              </p>
              <div className="flex justify-between items-center flex-1 min-w-0">
                <p
                  className={`truncate min-w-0 ${
                    item.status === "read"
                      ? "text-muted-foreground"
                      : "font-semibold"
                  }`}
                >
                  {item.msg}
                </p>
                <div
                  className="flex items-center gap-2 z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p
                    className={`w-16 flex-shrink-0 text-right ${
                      item.status === "read"
                        ? "text-muted-foreground"
                        : "font-semibold"
                    }`}
                    onClick={() => dispatch(getQuote(item._id))}
                  >
                    {dateFormatter(item.createdAt)}
                  </p>
                  <DeleteModal ids={ids} setIds={setIds}>
                    <Trash2Icon
                      className="size-6 hover:text-red-500 bg-red-100 rounded-full p-1"
                      onClick={() => setIds([item._id])}
                    />
                  </DeleteModal>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuotes;
