import { useState } from "react";

function AddUser({ onUserAdded, onCancel }) {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    gmail: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newUser = await response.json();

      if (!response.ok) {
        throw new Error(newUser.error || newUser.message || "Failed to add user");
      }

      onUserAdded(newUser);
      setFormData({ phone: "", name: "", gmail: "", image: "" });
    } catch (error) {
      console.error("Failed to add user:", error);
      alert(`Failed to add user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid gap-4 rounded-2xl bg-white p-5 shadow-md md:grid-cols-2"
    >
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
        required
      />

      <input
        type="email"
        name="gmail"
        placeholder="Gmail"
        value={formData.gmail}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
      />

      <div className="flex gap-3 md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add User"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl bg-gray-400 px-6 py-3 font-semibold text-white shadow-md hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddUser;