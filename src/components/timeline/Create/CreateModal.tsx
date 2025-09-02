import { useState, useEffect } from "react";
import type { EventType } from "../../types/types";
import imageCompression from "browser-image-compression";

interface CreateModalProps {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  onClose: () => void;
  editingEvent: EventType | null;
}

const CreateModal = ({ events, setEvents, onClose, editingEvent }: CreateModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("#000000");
  const [category, setCategory] = useState("Other");
  const [images, setImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description);
      setDate(editingEvent.date);
      setColor(editingEvent.color);
      setCategory(editingEvent.category);
      setImages(editingEvent.images || []);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setColor("#000000");
      setCategory("Other");
      setImages([]);
    }
  }, [editingEvent]);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setColor("#000000");
    setCategory("Other");
    setImages([]);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData: EventType = {
      id: editingEvent ? editingEvent.id : Date.now(),
      title,
      description,
      date,
      color,
      category,
      images,
    };

    if (editingEvent) {
      setEvents(events.map((ev) => (ev.id === editingEvent.id ? eventData : ev)));
    } else {
      setEvents([...events, eventData]);
    }

    handleClose();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    const newImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const compressed = await imageCompression(file, { maxSizeMB: 0.4, maxWidthOrHeight: 1024 });
        const reader = new FileReader();
        const imgData = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("File reading error"));
          reader.readAsDataURL(compressed);
        });
        newImages.push(imgData);
      }

      // Append images instead of replacing
      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
          {editingEvent ? "Edit Event" : "New Event"}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title Input */}
          <input
            required
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          {/* Description Input */}
          <textarea
            required
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          {/* Images */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Add Images</label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full text-gray-600" />
            {isCompressing && <p className="text-gray-500 text-sm mt-1">Compressing images...</p>}

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded-lg shadow" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date, Color, Category */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              required
              type="date"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              required
              type="color"
              className="w-16 h-12 border rounded-lg cursor-pointer"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <select
              required
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Other">Other</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Notes">Notes</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleClose} className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-lg shadow hover:opacity-90 transition"
              style={{ backgroundColor: color }}
            >
              {editingEvent ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
