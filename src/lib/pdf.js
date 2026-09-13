import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ORG, SLOGAN } from "./constants";

export function exportTable({ title, period, user, columns, rows }) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.setTextColor(26, 86, 219);
  doc.text("CDLJ — " + ORG, 14, 16);
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(SLOGAN, 14, 22);
  doc.setTextColor(20);
  doc.setFontSize(12);
  doc.text(title, 14, 32);
  doc.setFontSize(9);
  doc.text(`Période : ${period}`, 14, 38);
  doc.text(`Exporté le ${new Date().toLocaleString("fr-FR")} par ${user}`, 14, 44);
  autoTable(doc, { startY: 50, head: [columns], body: rows, styles: { fontSize: 8 } });
  doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
}
