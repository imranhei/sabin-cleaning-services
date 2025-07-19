import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuotes, updateQuote } from "@/redux/admin/quote-slice";
import {
  ChevronLeft,
  ChevronRight,
  History,
  Loader,
  RotateCcw,
  SquarePen,
  Trash2Icon,
} from "lucide-react";
import DeleteModal from "@/components/modal/DeleteModal";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import PerDeleteModal from "@/components/modal/PerDeleteModal";
import RecoverModal from "@/components/modal/RecoverModal";

const statusFeatures = {
  pending: {
    label: "Pending",
    variant: "secondary",
  },
  accepted: {
    label: "Accepted",
    variant: "accepted",
  },
  rejected: {
    label: "Rejected",
    variant: "rejected",
  },
};

const Inbox = ({ trashed = false, status = "all", title = "Inbox" }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { quotes, totalCount, isLoading } = useSelector((state) => state.quote);
  const [ids, setIds] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const isTrash = pathname.includes("trash");

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

  useEffect(() => {
    setIds([]);
  }, [pathname]);

  useEffect(() => {
    setPage(1);
  }, [status, trashed]);

  useEffect(() => {
    dispatch(getQuotes({ trashed, status, page, limit }));
  }, [trashed, status, page]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full min-h-40">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">{title}</h1>

      <div className="flex flex-col border rounded-md shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center p-3 h-12">
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
                  <Trash2Icon className="w-4 h-4" /> Delete ({ids.length})
                </Button>
              </DeleteModal>
            )}
            {ids.length > 0 && isTrash && (
              <RecoverModal ids={ids} setIds={setIds} resetIds={false}>
                <Button
                  size="sm"
                  className="rounded-full px-3 bg-green-400 hover:bg-green-500"
                >
                  <History className="w-4 h-4" /> Recover ({ids.length})
                </Button>
              </RecoverModal>
            )}
            <Button
              size="sm"
              className="rounded-full px-3 bg-blue-400 hover:bg-blue-500"
              onClick={() =>
                dispatch(getQuotes({ trashed, status, page, limit }))
              }
            >
              <RotateCcw size={14} />
              Reload
            </Button>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <p>
              {(page - 1) * limit + 1} - {Math.min(page * limit, totalCount)} of{" "}
              {totalCount}
            </p>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className={`size-4 ${page === 1 && "opacity-50"}`} />
            </button>
            <button
              onClick={() =>
                setPage((prev) => (prev * limit < totalCount ? prev + 1 : prev))
              }
              disabled={page * limit >= totalCount}
            >
              <ChevronRight
                className={`size-4 ${
                  page * limit >= totalCount && "opacity-50"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Quote List */}
        <div className="flex flex-col">
          {quotes.map((item) => {
            const curStatus = statusFeatures[item.status] || {
              label: "Unknown",
              variant: "secondary",
            };
            return (
              <Link
                to={`${item._id}`}
                key={item._id}
                className="flex gap-2 items-center p-3 border-t min-w-0 z-0 cursor-pointer hover:bg-gray-100"
              >
                <div
                  className="pt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }} // stop parent onClick
                >
                  <Checkbox
                    className="w-4 h-4 z-20"
                    checked={ids.includes(item._id)}
                    onCheckedChange={() => toggleSingle(item._id)}
                  />
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleFavorite(item);
                  }}
                >
                  <Badge variant={curStatus.variant} className="z-10">
                    {curStatus.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <p
                    className={`sm:w-32 w-24 pr-4 truncate ${
                      item?.isRead ? "" : "font-bold"
                    }`}
                  >
                    {item.name}
                  </p>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <p
                      className={`truncate min-w-0 pr-2 ${
                        item?.isRead ? "text-muted-foreground" : "font-semibold"
                      }`}
                    >
                      {item.msg}
                    </p>
                    <div
                      className="flex items-center gap-2 z-30 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      {item.note && (
                        <div className="p-1 bg-green-100 rounded">
                          <SquarePen className="size-4 text-green-500" />
                        </div>
                      )}
                      {isTrash && (
                        <RecoverModal
                          ids={[item._id]}
                          setIds={setIds}
                          trashed={true}
                          page={page}
                          limit={limit}
                        >
                          <div className="p-1 bg-green-100 rounded">
                            <History className="size-4 text-green-400 hover:text-green-500" />
                          </div>
                        </RecoverModal>
                      )}
                      <p
                        className={`w-fit flex-shrink-0 text-right ${
                          item?.isRead
                            ? "text-muted-foreground"
                            : "font-semibold"
                        }`}
                      >
                        {dateFormatter(item.createdAt)}
                      </p>

                      {isTrash ? (
                        <PerDeleteModal
                          ids={[item._id]}
                          setIds={setIds}
                          page={page}
                          limit={limit}
                        >
                          <Trash2Icon className="size-6 text-red-400 hover:text-red-500 bg-red-100 rounded p-1" />
                        </PerDeleteModal>
                      ) : (
                        <DeleteModal
                          ids={[item._id]}
                          setIds={setIds}
                          status={status}
                          page={page}
                          limit={limit}
                        >
                          <Trash2Icon className="size-6 text-red-400 hover:text-red-500 bg-red-100 rounded p-1" />
                        </DeleteModal>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
