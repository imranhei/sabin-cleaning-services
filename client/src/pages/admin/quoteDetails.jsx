import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  CircleCheckBig,
  CircleX,
  History,
  Loader,
  Printer,
  RefreshCw,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQuote, resetQuote, updateQuote } from "@/redux/admin/quote-slice";
import DeleteModal from "@/components/modal/DeleteModal";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import NoteModal from "@/components/modal/NoteModal";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PerDeleteModal from "@/components/modal/PerDeleteModal";
import RecoverModal from "@/components/modal/RecoverModal";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

const QuoteDetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quote, isLoading } = useSelector((state) => state.quote);
  const isTrash = pathname.includes("trash");

  const [formData, setFormData] = useState("");
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const handleStatus = (status) => {
    dispatch(updateQuote({ id: quote._id, status }));
  };

  const dateFormatter = (date) => {
    const d = new Date(date);

    const datePart = d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const timePart = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // use false for 24-hour format
    });

    return `${datePart} at ${timePart}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.trim() === quote?.note.trim()) return;
    setIsLoadingSave(true);
    // Dispatch the createQuote action
    dispatch(updateQuote({ id: quote?._id, note: formData })).then((res) => {
      if (res.payload?.success) {
        toast.success("Note updated successfully");
      } else {
        toast.error(res.payload || "Something went wrong");
      }
    });
    setIsLoadingSave(false);
  };

  useEffect(() => {
    dispatch(getQuote(id));
  }, [dispatch, id]);

  useEffect(() => {
    setFormData(quote?.note || "");
  }, [quote]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full min-h-40">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col border rounded-md shadow-md">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex gap-2 items-center">
          <ArrowLeft
            className="size-4 cursor-pointer"
            onClick={() => {
              dispatch(resetQuote());
              navigate(-1);
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          {isTrash ? (
            <div className="flex items-center gap-2">
              <RecoverModal ids={[quote?._id]} trashed={true}>
                <div className="p-1 bg-green-100 rounded">
                  <History className="size-4 text-green-400 hover:text-green-500" />
                </div>
              </RecoverModal>
              <PerDeleteModal ids={[quote?._id]} resetQut={true}>
                <Trash2Icon className="size-6 text-red-400 hover:text-red-500 bg-red-100 rounded p-1" />
              </PerDeleteModal>
            </div>
          ) : (
            <DeleteModal ids={[quote?._id]} resetQut={true}>
              <Trash2Icon className="size-6 text-red-400 hover:text-red-500 bg-red-100 rounded p-1 cursor-pointer" />
            </DeleteModal>
          )}
          {quote?.status !== "pending" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <RefreshCw size={16} className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={quote?.status}
                  onValueChange={(value) => handleStatus(value)}
                >
                  {["pending", "accepted", "rejected"].map((status) => (
                    <DropdownMenuRadioItem key={status} value={status}>
                      {statusFeatures[status]?.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Badge
            variant={statusFeatures[quote?.status]?.variant}
            className="capitalize"
          >
            {statusFeatures[quote?.status]?.label}
          </Badge>
          <Printer className="size-4" />
        </div>
      </div>
      <div className="flex flex-col px-2 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">{quote?.name}</h2>
          <p className="text-muted-foreground text-sm">
            {dateFormatter(quote?.createdAt)}
          </p>
        </div>
        <p className="whitespace-pre-line">{quote?.msg}</p>
        <div>
          <h2 className="font-semibold">Contact</h2>
          <p className="text-muted-foreground">{quote?.email}</p>
          <p className="text-muted-foreground">{quote?.phone}</p>
          <p className="text-muted-foreground">{quote?.address}</p>
        </div>
        {quote?.note && (
          <div>
            <p className="font-semibold">Note :</p>
            <p className="text-muted-foreground whitespace-pre-line">
              {quote?.note}
            </p>
          </div>
        )}

        {quote?.status === "pending" && <hr />}
        {quote?.status === "pending" && (
          <div className="flex justify-center sm:gap-4 gap-2">
            <Button
              variant="accepted"
              className="w-40"
              onClick={() => {
                handleStatus("accepted");
              }}
            >
              <CircleCheckBig strokeWidth={2.5} />
              Accept
            </Button>
            <Button
              variant="destructive"
              className="w-40"
              onClick={() => {
                handleStatus("rejected");
              }}
            >
              <CircleX strokeWidth={2.5} />
              Reject
            </Button>
          </div>
        )}

        <hr />
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="font-semibold">
              {quote?.note ? "Edit Note" : "Add Note"}
            </div>
            <Textarea
              placeholder="Type your note here..."
              className="min-h-32 max-h-48"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
            />
            <div className="flex justify-end">
              <Button className="max-w-40 w-full bg-[#79c043]" type="submit">
                {isLoadingSave && <Loader className="mr-2 animate-spin" />} Save
                Note
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteDetails;
