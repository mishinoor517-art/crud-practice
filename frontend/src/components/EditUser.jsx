import { useState } from "react";

function EditUser({ user, onUserUpdated, onCancel }) {
  const [formData, setFormData] = useState(() => ({
    phone: user?.phone || "",
    name: user?.name || "",
    gmail: user?.gmail || "",
    image: user?.image || "",
  }));

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

    if (!user?._id) {
      alert("User ID not found");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("Update response:", result);

      if (!response.ok) {
        throw new Error(result.error || result.message || "Update failed");
      }

      alert("User updated successfully");

      onUserUpdated(result);
    } catch (error) {
      console.error("Update error:", error);
      alert(`Update failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mb-6 grid gap-4 rounded-2xl bg-white p-5 shadow-md md:grid-cols-2"
    >
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
      />

      <input
        type="email"
        name="gmail"
        placeholder="Gmail"
        value={formData.gmail}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
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
          className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update User"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-gray-400 px-6 py-3 font-semibold text-white hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditUser;