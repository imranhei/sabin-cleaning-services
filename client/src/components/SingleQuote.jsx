import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Loader,
  Printer,
  Save,
  Star,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { resetQuote, updateQuote } from "@/redux/admin/quote-slice";
import DeleteModal from "@/components/modal/DeleteModal";

const SingleQuote = () => {
  const dispatch = useDispatch();
  const { quote, isLoading } = useSelector((state) => state.quote);
  const [note, setNote] = useState(quote?.note || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    if (note.trim() === quote.note) return; // avoid unnecessary update
    dispatch(updateQuote({ id: quote._id, note }));
  };

  const handleToggleFavorite = () => {
    dispatch(updateQuote({ id: quote._id, favorite: !quote.favorite }));
  };

  return (
    <div className="flex flex-col border rounded-md shadow-md">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex gap-2 items-center">
          <ArrowLeft
            className="size-4"
            onClick={() => dispatch(resetQuote())}
          />
          <DeleteModal ids={[quote._id]} resetQut={true}>
            <Trash2Icon className="size-6 hover:text-red-500 bg-red-100 rounded-full p-1" />
          </DeleteModal>
          <Star
            className={`size-6 hover:text-yellow-500 bg-yellow-100 rounded-full p-1 cursor-pointer ${
              quote.favorite ? "fill-yellow-400 text-yellow-500" : ""
            }`}
            onClick={handleToggleFavorite}
          />
        </div>
        <Printer className="size-4" />
      </div>
      <div className="flex flex-col p-2 space-y-4">
        <div className="flex justify-between">
          <h2 className="font-semibold">{quote.name}</h2>
          <p className="text-muted-foreground">{quote.date}</p>
        </div>
        <p>{quote.msg}</p>
        <div>
          <h2 className="font-semibold">Contact</h2>
          <p className="text-muted-foreground">{quote.email}</p>
          <p className="text-muted-foreground">{quote.phone}</p>
          <p className="text-muted-foreground">{quote.address}</p>
        </div>
        <div>
          <p>Notes :</p>
          <p className="text-muted-foreground">{quote.note}</p>
        </div>
        <form onSubmit={handleUpdate} className="space-y-2">
          <Textarea
            placeholder="Type your note here"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-20"
          />
          <Button className="bg-[#79c043]" type="submit">
            {isLoading ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              <Save className="mr-2" />
            )}
            Save Note
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SingleQuote;
