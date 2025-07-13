import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Printer,
  RotateCcw,
  Save,
  Star,
  Trash2Icon,
} from "lucide-react";
import React, { useState } from "react";

const msg = [
  {
    id: 1,
    name: "John Doe",
    email: "Iw0Qs@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    date: "Jun 18",
    msg: "Hello, how are you? I need to book a cleaning service for my apartment. Can you help me with that?",
    note: "I need to book a cleaning service for my apartment. Can you help me with that?",
    status: "unread",
  },
  {
    id: 2,
    name: "John Doe",
    email: "jw0Qs@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    date: "Jun 18",
    msg: "Hello, how are you? I need to book a cleaning service for my apartment. Can you help me with that?",
    note: "",
    status: "unread",
  },
  {
    id: 3,
    name: "John Doe",
    email: "jw0Qs@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    date: "Jun 18",
    msg: "Hello, how are you? I need to book a cleaning service for my apartment. Can you help me with that?",
    note: "",
    status: "read",
  },
  {
    id: 4,
    name: "Imran Hossain",
    email: "jw0Qs@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    date: "Jun 18",
    msg: "Hello, how are you? I need to book a cleaning service for my apartment. Can you help me with that?",
    note: "",
    status: "read",
  },
];

const Inbox = () => {
  const [quote, setQuote] = useState(null);

  const handleNoteUpdate = () => {
    console.log(quote);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">Inbox</h1>
      {quote ? (
        <div className="flex flex-col border rounded-md shadow-md">
          <div className="flex justify-between items-center p-2 border-b">
            <div className="flex gap-2 items-center">
              <ArrowLeft className="size-4" onClick={() => setQuote(null)} />
              <Trash2Icon className="size-6 hover:text-red-500 bg-red-100 rounded-full p-1" />
              <Star className="size-6 hover:text-yellow-500 bg-yellow-100 rounded-full p-1" />
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
            <div className="space-y-2">
              <Textarea
                placeholder="Type your note here"
                value={quote.note}
                onChange={(e) => setQuote({ ...quote, note: e.target.value })}
              />
              <Button className="bg-[#3b82f6]" onClick={handleNoteUpdate}>
                <Save className="" />
                Save Note
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col border rounded-md shadow-md">
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-2 items-center z-20">
              <Input type="checkbox" className="w-4 h-4" />
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="flex gap-2 items-center text-sm">
              <p>1 - 50 of 100</p>
              <ChevronLeft className="size-4" />
              <ChevronRight className="size-4" />
            </div>
          </div>

          <div className="flex flex-col">
            {msg.map((item) => (
              <div
                key={item.id}
                className="flex gap-2 items-center p-3 border-t min-w-0 z-0 cursor-pointer hover:bg-gray-100"
                onClick={() => setQuote(item)}
              >
                <Input
                  type="checkbox"
                  className="w-4 h-4 z-20"
                  onClick={(e) => e.stopPropagation()}
                />
                <Star
                  className="w-4 h-4 z-20"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <p
                    className={`${
                      item.status === "read" ? "" : "font-bold"
                    } sm:w-32 w-24 pr-4 truncate`}
                  >
                    {item.name}
                  </p>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <p
                      className={`${
                        item.status === "read"
                          ? "text-muted-foreground"
                          : " font-semibold"
                      } truncate min-w-0`}
                    >
                      {item.msg}
                    </p>
                    <div className="flex items-center gap-2">
                      <p
                        className={`${
                          item.status === "read"
                            ? "text-muted-foreground"
                            : "font-semibold"
                        } w-16 flex-shrink-0 text-right`}
                      >
                        {item.date}
                      </p>
                      <Trash2Icon
                        className="size-6 hover:text-red-500 bg-red-100 rounded-full p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // handle delete
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
