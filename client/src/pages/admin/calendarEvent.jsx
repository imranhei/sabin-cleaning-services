import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button } from "@/components/ui/button";
import AddEventModal from "@/components/modal/AddEventModal";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "@/redux/admin/event-slice";
import { useState, useEffect } from "react";
const localizer = momentLocalizer(moment);

const CalendarEvent = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.event);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectEvent = (event) => {
    // console.log(event);
    setSelectedEvent(event);
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Lists</h1>
        <AddEventModal event={selectedEvent} open={modalOpen} setOpen={setModalOpen}>
          <Button
            onClick={() => {
              setSelectedEvent(null);
              setModalOpen(true);
            }}
          >
            Add Event
          </Button>
        </AddEventModal>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => new Date(event.start)}
        endAccessor={(event) => new Date(event.end)}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
      {/* {selectedEvent && (
        <AddEventModal
          event={selectedEvent}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      )} */}
    </div>
  );
};

export default CalendarEvent;
