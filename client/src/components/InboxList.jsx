import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { NotebookPen } from "lucide-react";

const InboxList = ({
  item,
  ids,
  toggleSingle,
  curStatus,
}) => {
  const dateFormatter = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex gap-2 items-center sm:p-3 p-2 border-t min-w-0 z-0 cursor-pointer hover:bg-gray-100 w-full">
      <div className="flex flex-1 gap-2 items-center min-w-0">
        <div className="flex sm:flex-row flex-col items-center gap-2">
          <div
            className="pt-1 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Checkbox
              className="w-4 h-4 z-20"
              checked={ids.includes(item._id)}
              onCheckedChange={() => toggleSingle(item._id)}
            />
          </div>
          <Badge variant={curStatus.variant} className="z-10 flex-shrink-0">
            {curStatus.label}
          </Badge>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 sm:items-center min-w-0 flex-1 w-full">
          <p
            className={`sm:w-32 w-full pr-2 truncate flex-shrink-0 ${
              item?.isRead ? "" : "font-bold"
            }`}
          >
            {item?.name}
          </p>
          <p
            className={`truncate min-w-0 flex-1 pr-2 ${
              item?.isRead ? "text-muted-foreground" : "font-semibold"
            }`}
          >
            {item?.msg}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex flex-col sm:flex-row sm:items-end items-center gap-1 sm:gap-2 flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {/* Action buttons */}
        <div className="flex gap-1 sm:gap-2">
          {item.note && (
            <div className="p-1 rounded flex-shrink-0">
              <NotebookPen className="size-4 text-green-500" />
            </div>
          )}
          {/* {isTrash && (
            <RecoverModal
              ids={[item._id]}
              setIds={setIds}
              trashed={true}
              page={page}
              limit={limit}
            >
              <div className="p-1 bg-green-100 rounded flex-shrink-0">
                <History className="size-4 text-green-400 hover:text-green-500" />
              </div>
            </RecoverModal>
          )} */}
        </div>
        {/* Date - appears second on small screens */}
        <p
          className={`flex-shrink-0 text-right ${
            item?.isRead ? "text-muted-foreground" : "font-semibold"
          }`}
        >
          {dateFormatter(item.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default InboxList;
