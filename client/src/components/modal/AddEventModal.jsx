import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { formatTime } from "@/utilities/formatTime";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/redux/admin/event-slice";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const DateTimePicker = ({
  label,
  date,
  setDate,
  popOpen,
  setPopOpen,
  hideTime,
}) => (
  <div className="flex items-center gap-4">
    <Label>{label}</Label>
    <Popover open={popOpen} onOpenChange={setPopOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-32 justify-between font-normal">
          {date ? new Date(date).toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          captionLayout="dropdown"
          onSelect={(selectedDate) => {
            const newDate = new Date(selectedDate);
            if (date && !hideTime) {
              newDate.setHours(new Date(date).getHours());
              newDate.setMinutes(new Date(date).getMinutes());
              newDate.setSeconds(new Date(date).getSeconds());
            }
            setDate(newDate);
            setPopOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
    {!hideTime && (
      <Input
        type="time"
        step="1"
        value={date ? formatTime(new Date(date)) : ""}
        onChange={(e) => {
          const [h, m, s] = e.target.value.split(":").map(Number);
          const updated = new Date(date || new Date());
          updated.setHours(h);
          updated.setMinutes(m);
          updated.setSeconds(s ?? 0);
          setDate(updated);
        }}
        className="bg-background max-w-32 text-sm appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
      />
    )}
  </div>
);

const AddEventModal = ({
  children,
  event = {
    _id: null,
    title: "",
    start: null,
    end: null,
    allDay: true,
    description: "",
  },
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.event);
  const [formData, setFormData] = useState(() => event);
  const [popOpen1, setPopOpen1] = useState(false);
  const [popOpen2, setPopOpen2] = useState(false);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleAllDayChange = (val) => {
    if (val) {
      const today = new Date();
      const start = new Date(today.setHours(0, 0, 0, 0));
      const end = new Date(today.setHours(23, 59, 59, 999));
      setFormData((prev) => ({ ...prev, allDay: true, start, end }));
    } else {
      setFormData((prev) => ({ ...prev, allDay: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const action = formData._id ? updateEvent : createEvent;
    const payload = formData._id
    ? { id: formData._id, ...formData }
    : formData;

    dispatch(action(payload)).then((res) => {
      if (res.payload?.success) {
        toast.success(
          formData._id
            ? "Event updated successfully"
            : "Event created successfully"
        );
        setOpen(false);
      } else {
        toast.error(res.payload?.message || "Something went wrong");
      }
    });
  };

  const handleDelete = () => {
    dispatch(deleteEvent(formData._id)).then((res) => {
      if (res.payload?.success) {
        toast.success("Event deleted successfully");
        setOpen(false);
      } else {
        toast.error(res.payload?.message || "Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center hidden sm:block" />
          <DialogDescription className="text-center py-2 text-black/70 font-bold text-xl">
            Add New Event
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Event title *"
              required
              value={formData?.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Event Timing</Label>
            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={formData?.allDay}
                  onCheckedChange={handleAllDayChange}
                />
                Full Day
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={!formData?.allDay}
                  onCheckedChange={(v) =>
                    setFormData({ ...formData, allDay: !v })
                  }
                />
                Set Time Period
              </div>
            </div>
          </div>

          {formData?.allDay ? (
            <DateTimePicker
              label="Date"
              date={formData?.start}
              setDate={(date) => {
                if (!date) return;
                const start = new Date(date);
                start.setHours(0, 0, 0, 0);
                const end = new Date(date);
                end.setHours(23, 59, 59, 999);
                setFormData((p) => ({ ...p, start, end }));
              }}
              popOpen={popOpen1}
              setPopOpen={setPopOpen1}
              hideTime={true}
            />
          ) : (
            <>
              <DateTimePicker
                label="Start Time"
                date={formData?.start}
                setDate={(date) => setFormData((p) => ({ ...p, start: date }))}
                popOpen={popOpen1}
                setPopOpen={setPopOpen1}
                hideTime={false}
              />
              <DateTimePicker
                label="End Time"
                date={formData?.end}
                setDate={(date) => setFormData((p) => ({ ...p, end: date }))}
                popOpen={popOpen2}
                setPopOpen={setPopOpen2}
                hideTime={false}
              />
            </>
          )}

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Event description"
              value={formData?.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4">
            {formData?._id && (
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <Button type="submit" className="flex-1">
              {isLoading && <Loader className="animate-spin" />}
              {formData?._id ? "Update" : "Add Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;
