function DynamicTable({ columns, data, onRowClick, selectedId }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-white shadow-xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            {columns.map((column) => (
              <th
                key={column.key}
                className="border-r border-purple-400 px-6 py-4 text-left text-sm font-semibold last:border-r-0"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row._id}
              onClick={() => onRowClick(row)}
              className={`cursor-pointer border-b border-gray-200 transition ${
                selectedId === row._id
                  ? "bg-purple-100"
                  : "hover:bg-purple-50"
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="border-r border-gray-200 px-6 py-5 text-sm text-gray-700 last:border-r-0"
                >
                  {column.key === "image" ? (
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-400 text-lg shadow">
                        👤
                      </div>
                    </div>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;