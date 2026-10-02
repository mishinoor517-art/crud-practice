import { useEffect, useState } from "react";
import DynamicButton from "../components/DynamicButton";
import DynamicTable from "../components/DynamicTable";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";

function Home() {
  const columns = [
    { key: "phone", label: "Phone Number" },
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "gmail", label: "Gmail" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
        setData(users);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    setShowAddForm(true);
    setShowEditForm(false);
    setSelectedUser(null);
  };

  const handleUserAdded = (newUser) => {
    setData((previousData) => [...previousData, newUser]);
    setShowAddForm(false);
  };

  const handleEdit = () => {
    if (!selectedUser) {
      alert("Please select a user first");
      return;
    }

    setShowAddForm(false);
    setShowEditForm(true);
  };

  const handleUserUpdated = (updatedUser) => {
    setData((previousData) =>
      previousData.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );

    setShowEditForm(false);
    setSelectedUser(null);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setSelectedUser(null);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowEditForm(false);
    setShowAddForm(false);
  };

  const handleDelete = async () => {
    if (!selectedUser) {
      alert("Please select a user first");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUser.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${selectedUser._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete user");
      }

      setData((previousData) =>
        previousData.filter((user) => user._id !== selectedUser._id)
      );

      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Users Management
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your users information
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-md">

        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Users List
          </h2>

          <p className="text-sm text-gray-400">
            Total Users: {data.length}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <DynamicButton
            text="+ Add User"
            onClick={handleAdd}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 hover:from-purple-700 hover:to-blue-700"
          />

          <DynamicButton
            text="Edit"
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600"
          />

          <DynamicButton
            text="Delete"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          />

        </div>
      </div>

      {showAddForm && (
        <AddUser onUserAdded={handleUserAdded} />
      )}

      {selectedUser && showEditForm && !showAddForm && (
        <EditUser
          key={selectedUser._id}
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
          onCancel={handleCancelEdit}
        />
      )}

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <DynamicTable
          columns={columns}
          data={data}
          onRowClick={handleRowClick}
          selectedId={selectedUser?._id}
        />
      )}
    </div>
  );
}

export default Home;