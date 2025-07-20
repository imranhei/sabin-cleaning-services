import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuotes } from "@/redux/admin/quote-slice";
import { Loader } from "lucide-react";
import InboxHeader from "@/components/InboxHeader";
import InboxList from "@/components/InboxList";
import { Link, useLocation } from "react-router-dom";
import { updateUnseen } from "@/redux/admin/dashboard-slice";

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

      <div className="flex flex-col border rounded-md shadow-md overflow-x-auto">
        {/* Header */}
        <InboxHeader
          isAllSelected={isAllSelected}
          toggleSelectAll={toggleSelectAll}
          ids={ids}
          setIds={setIds}
          page={page}
          limit={limit}
          isTrash={isTrash}
          trashed={trashed}
          status={status}
          totalCount={totalCount}
        />

        {/* Quote List */}
        <div className="flex flex-col w-full overflow-x-auto">
          {quotes.map((item) => {
            const curStatus = statusFeatures[item.status] || {
              label: "Unknown",
              variant: "secondary",
            };
            return (
              <Link
                to={`${item._id}`}
                key={item._id}
                onClick={() => {
                  if (!item.isRead) {
                    dispatch(updateUnseen(-1));
                  }
                }}
              >
                <InboxList
                  item={item}
                  ids={ids}
                  setIds={setIds}
                  toggleSingle={toggleSingle}
                  curStatus={curStatus}
                  isTrash={isTrash}
                  page={page}
                  limit={limit}
                  status={status}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
