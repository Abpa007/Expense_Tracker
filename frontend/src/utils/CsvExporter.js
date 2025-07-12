// utils/csvExporter.js

export const downloadCSV = (data, filename = "expenses.csv") => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const csvHeaders = Object.keys(data[0]).filter(
    (key) => !["_id", "user", "__v"].includes(key)
  );

  const readableHeaders = csvHeaders.map((key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  );

  const separator = ",  "; // comma + 2 spaces

  const csvRows = data.map(
    (row) =>
      csvHeaders
        .map((header) => {
          let value = row[header];
          if (["date", "createdAt", "updatedAt"].includes(header) && value) {
            const formattedDate = new Date(value).toLocaleDateString("en-GB"); // DD/MM/YYYY
            value = `'${formattedDate}`;
          }
          return (value ?? "").toString().trim();
        })
        .join(separator) + separator // enforce 2 spaces after the last column
  );

  const csvContent =
    readableHeaders.join(separator) + separator + "\n" + csvRows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
