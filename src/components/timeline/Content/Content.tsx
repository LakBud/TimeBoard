import { useState } from "react";
import { motion } from "framer-motion";
import type { EventType } from "../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface ContentProps {
  events?: EventType[];
  onEdit?: (event: EventType) => void;
  onDelete?: (id: number) => void;
}

// Example category colors; users can define more in your modal
const categoryColors: Record<string, string> = {
  Work: "#3B82F6", // blue
  Personal: "#FBBF24", // yellow
  Travel: "#10B981", // green
  Other: "#9CA3AF", // gray
};

const Content = ({ events = [], onEdit = () => {}, onDelete = () => {} }: ContentProps) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      <div className="relative border-l-2 border-gray-300 ml-6">
        {events.length === 0 && <p className="text-gray-500 ml-6 mt-2 italic">No events yet. Add one to start your timeline.</p>}

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="mb-12 relative flex flex-col md:flex-row items-start md:items-center"
          >
            {/* Timeline Dot */}
            <span
              className="w-4 h-4 rounded-full absolute -left-6 top-1/2 transform -translate-y-1/2 border-2 border-white shadow-md"
              style={{ backgroundColor: event.color || "#4B5563" }}
            />

            {/* Vertical connector line */}
            {index < events.length - 1 && (
              <span
                className="absolute left-[-0.5rem] top-[50%] h-full w-[2px] z-[-1] rounded"
                style={{ backgroundColor: event.color || "#D1D5DB" }}
              />
            )}

            {/* Event Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-5 w-full md:w-3/4 flex flex-col md:flex-row md:justify-between gap-4 hover:shadow-xl transition-shadow duration-300">
              {/* Images Carousel */}
              {event.images?.length ? (
                <div className="w-full md:w-52 mb-4 md:mb-0 md:mr-4">
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={12}
                    slidesPerView={1}
                    className="rounded-lg overflow-hidden shadow-sm"
                  >
                    {event.images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={img}
                          alt={`${event.title} ${idx + 1}`}
                          className="w-full h-44 object-cover rounded-lg cursor-zoom-in"
                          onClick={() => setZoomedImage(img)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : null}

              {/* Event Text */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-gray-700 mt-1">{event.description}</p>
                <p className="text-sm text-gray-500 mt-1">{event.date}</p>

                {/* Category Badge */}
                {event.category && (
                  <span
                    className="inline-block px-3 py-1 rounded-full text-white text-sm mt-2 font-medium"
                    style={{ backgroundColor: categoryColors[event.category] || "#9CA3AF" }}
                  >
                    {event.category}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 md:ml-4">
                <button className="text-blue-500 hover:underline font-medium transition" onClick={() => onEdit(event)}>
                  Edit
                </button>
                <button className="text-red-500 hover:underline font-medium transition" onClick={() => onDelete(event.id)}>
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Zoom Lightbox */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <img src={zoomedImage} alt="Zoomed" className="max-h-[90%] max-w-[90%] object-contain rounded-xl shadow-lg" />
        </div>
      )}
    </>
  );
};

export default Content;
