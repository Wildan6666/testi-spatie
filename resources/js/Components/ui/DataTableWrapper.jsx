import DataTable from "react-data-table-component";

export default function DataTableWrapper({ columns, data, noDataMessage = "😔 Data tidak ditemukan" }) {
  const customStyles = {
    table: {
      style: {
        borderTop: "3px solid #3b82f6", // biru-500
        borderRadius: "0.75rem", // rounded-xl
        overflow: "hidden",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f9fafb", // gray-50
        fontWeight: "600",
        fontSize: "0.875rem",
        color: "#374151", // gray-700
      },
    },
    rows: {
      style: {
        fontSize: "0.875rem",
        color: "#374151",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #e5e7eb", // gray-200
        },
      },
    },
  };

  return (
    <div className="rounded-xl shadow overflow-hidden">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        noDataComponent={noDataMessage}
        customStyles={customStyles}
      />
    </div>
  );
}
