import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { EventType } from "../types/types";
import CreateModal from "./Create/CreateModal";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import bgPattern from "../assets/bg.jpg";
import FilterMenu from "./Filter/FilterMenu";

const categoryColors: Record<string, string> = {
  Work: "#F59E0B",
  Personal: "#10B981",
  Notes: "#3B82F6",
  Other: "#9CA3AF",
};

const Timeline = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const handleEdit = (event: EventType) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  const handleImageClick = (img: string) => setZoomedImage(img);

  const categories = Object.keys(categoryColors);

  // Filter events based on selected category
  const filteredEvents = filterCategory ? events.filter((event) => event.category === filterCategory) : events;

  return (
    <div
      className="w-full min-h-screen bg-repeat"
      style={{ backgroundImage: `url(${bgPattern})`, backgroundSize: "100px 100px" }}
    >
      {/* Nav Bar */}
      <nav className="fixed top-6 left-0 w-full bg-amber-50 flex items-center justify-between px-4 sm:px-6 z-50 p-4 sm:p-5 shadow-md">
        <Link to="/">
          <button className="bg-yellow-400 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl shadow-lg hover:bg-yellow-500 transition flex items-center justify-center">
            <FaHome size={24} />
          </button>
        </Link>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl font-bold text-gray-800">TimeBoard</h1>

        <button
          className="bg-green-500 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl shadow-lg hover:bg-green-600 transition flex items-center justify-center"
          onClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
        >
          +
        </button>
      </nav>

      {/* Main Content */}
      <div className="pt-28 px-4 sm:px-6 min-h-screen flex flex-col items-center">
        {/* Filter Menu */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full max-w-5xl">
          <h2 className="text-xl sm:text-2xl font-bold">Events</h2>
          <FilterMenu selected={filterCategory} onChange={setFilterCategory} categories={categories} />
        </div>

        <div className="w-full max-w-5xl flex flex-col gap-6 relative">
          {filteredEvents.length === 0 && <p className="text-gray-400 mt-2 italic">No events found.</p>}

          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center relative w-full"
            >
              {/* Timeline Dot */}
              <span
                className="w-4 h-4 rounded-full absolute -left-6 sm:-left-7 top-1/2 transform -translate-y-1/2 border-2 border-white shadow"
                style={{ backgroundColor: event.color || "#FBBF24" }}
              />

              {/* Vertical Connector Line */}
              {index < filteredEvents.length - 1 && (
                <span
                  className="absolute left-[-0.5rem] top-[calc(50%+10px)] w-[2px]"
                  style={{
                    height: "calc(100% - 20px)",
                    backgroundColor: event.color || "#FBBF24",
                    borderRadius: "9999px",
                  }}
                />
              )}

              {/* Event Card */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 w-full flex flex-col md:flex-row gap-4 transition-all duration-200 hover:shadow-2xl">
                {/* Images Carousel */}
                {event.images && event.images.length > 0 && (
                  <div className="w-full md:w-52 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      spaceBetween={16}
                      slidesPerView={1}
                    >
                      {event.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={img}
                            alt={`${event.title} ${idx + 1}`}
                            className="w-full h-36 sm:h-44 md:h-52 object-cover rounded-lg cursor-zoom-in shadow-sm"
                            onClick={() => handleImageClick(img)}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                {/* Event Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">{event.title}</h3>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base md:text-base leading-relaxed break-words overflow-ellipsis max-w-full">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 items-center">
                      <span className="text-sm text-gray-500">{event.date}</span>
                      <span
                        className="text-sm font-medium px-2 py-1 rounded-md truncate"
                        style={{
                          backgroundColor: event.color || "#FBBF24",
                          color: "#fff",
                        }}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-2 md:ml-4 flex-shrink-0 w-full md:w-auto">
                    <button
                      className="text-white px-4 py-2 rounded-lg shadow w-full md:w-auto transition truncate"
                      style={{ backgroundColor: event.color || "#FBBF24" }}
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 w-full md:w-auto transition truncate"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Zoom Lightbox */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out p-4"
          onClick={() => setZoomedImage(null)}
        >
          <img src={zoomedImage} alt="Zoomed" className="max-h-[90%] max-w-[90%] object-contain rounded-xl" />
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <CreateModal events={events} setEvents={setEvents} onClose={() => setIsModalOpen(false)} editingEvent={editingEvent} />
      )}
    </div>
  );
};

export default Timeline;
