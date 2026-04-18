import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type ExportType = "Copy" | "Excel" | "CSV" | "PDF" | "Print";

export const handleExport = (
  type: ExportType,
  data: any[],
  filename: string = "export"
) => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  // Format data: ensure all values are string/number and handle nested objects if any
  const formattedData = data.map(item => {
    const newItem: any = {};
    Object.keys(item).forEach(key => {
      const val = item[key];
      if (typeof val === 'object' && val !== null) {
        newItem[key] = JSON.stringify(val);
      } else {
        newItem[key] = val === null || val === undefined ? "" : val;
      }
    });
    return newItem;
  });

  if (type === "Copy") {
    const header = Object.keys(formattedData[0]).join("\t");
    const rows = formattedData.map(row => Object.values(row).join("\t")).join("\n");
    navigator.clipboard.writeText(`${header}\n${rows}`);
    alert("Data copied to clipboard!");
  } else if (type === "Excel") {
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  } else if (type === "CSV") {
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (type === "PDF") {
    const doc = new jsPDF("l");
    autoTable(doc, {
      head: [Object.keys(formattedData[0])],
      body: formattedData.map(row => Object.values(row)),
      styles: { fontSize: 8 },
      headStyles: { fillStyle: 'f', fillColor: [130, 180, 64] } // Matching theme success-300
    });
    doc.save(`${filename}.pdf`);
  } else if (type === "Print") {
    window.print();
  }
};
