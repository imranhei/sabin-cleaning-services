import React from "react";
import { Checkbox } from "./ui/checkbox";
import PerDeleteModal from "./modal/PerDeleteModal";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  History,
  RotateCcw,
  Trash2Icon,
} from "lucide-react";
import DeleteModal from "./modal/DeleteModal";
import RecoverModal from "./modal/RecoverModal";
import { useDispatch } from "react-redux";
import { getQuotes } from "@/redux/admin/quote-slice";

const InboxHeader = ({
  isAllSelected,
  toggleSelectAll,
  ids,
  setIds,
  page,
  limit,
  isTrash,
  status,
  trashed,
  totalCount,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center p-3 h-12">
      <div className="flex gap-2 items-center z-20">
        <Checkbox
          className="w-4 h-4"
          checked={isAllSelected}
          onCheckedChange={toggleSelectAll}
        />
        {ids.length > 0 &&
          (isTrash ? (
            <PerDeleteModal ids={ids} setIds={setIds} page={page} limit={limit}>
              <Button
                variant="destructive"
                size="sm"
                className="rounded-full px-3"
              >
                <Trash2Icon className="rounded" />
                <span className="sm:block hidden">Delete</span>({ids.length})
              </Button>
            </PerDeleteModal>
          ) : (
            <DeleteModal ids={ids} setIds={setIds} resetIds={false}>
              <Button
                variant="destructive"
                size="sm"
                className="rounded-full px-3"
              >
                <Trash2Icon className="w-4 h-4" />
                <span className="sm:block hidden">Delete</span> ({ids.length})
              </Button>
            </DeleteModal>
          ))}

        {ids.length > 0 && isTrash && (
          <RecoverModal ids={ids} setIds={setIds} resetIds={false}>
            <Button
              size="sm"
              className="rounded-full px-3 bg-green-400 hover:bg-green-500"
            >
              <History className="w-4 h-4" />{" "}
              <span className="sm:block hidden">Recover</span> ({ids.length})
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
          <span className="sm:block hidden">Reload</span>
        </Button>
      </div>
      <div className="flex gap-2 items-center text-nowrap text-sm">
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
            className={`size-4 ${page * limit >= totalCount && "opacity-50"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default InboxHeader;
