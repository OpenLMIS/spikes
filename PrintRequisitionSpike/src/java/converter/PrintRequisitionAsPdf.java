package converter;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfWriter;

import java.awt.*;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.Date;


public class PrintRequisitionAsPdf {
  public static void main(String[] args) throws Exception {
    writePdf(0);
    PdfReader reader1 = new PdfReader("Table.pdf");
    int n1 = reader1.getNumberOfPages();
    writePdf(n1);
  }

  private static void writePdf(int totalPages) throws DocumentException, FileNotFoundException {
    Rectangle rec = new Rectangle(1500, 1059);
    Document document = new Document(rec);
    PdfWriter.getInstance(document,
      new FileOutputStream("Table.pdf"));
    HeaderFooter footer = new HeaderFooter(new Phrase("Page "), new Phrase("/" + totalPages + ".  Date - " + new Date()));
    footer.setAlignment(Element.ALIGN_RIGHT);
    document.setFooter(footer);
    document.addCreationDate();
    document.open();

    Paragraph paragraph = new Paragraph();
    Chunk chunk = new Chunk("Report and Requisition for :", FontFactory.getFont(FontFactory.TIMES, 30, Font.BOLD, Color.BLACK));
    paragraph.add(chunk);
    chunk = new Chunk("\n\nFacility: F10 \t\t Operated By: WHO \t\t Maximum Stock level: 3 \t\t Emergency Order Point: abcd \n\n" +
      " State: Arusha \t\t District: Arusha \t\t Reporting Peroid: 03/03/2012 - 03/03/2013", FontFactory.getFont(FontFactory.TIMES, 20, Font.NORMAL, Color.BLACK));
    paragraph.add(chunk);
    document.add(paragraph);
    PdfPTable table = new PdfPTable(21);
    int[] widths = new int[]{40, 150, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 100, 40, 40, 40, 40, 50};
    table.setWidths(widths);
    table.getDefaultCell().setBackgroundColor(Color.DARK_GRAY);
    table.setWidthPercentage(100);
    table.setSpacingBefore(100);

    table.addCell("Product Code");
    table.addCell("Product");
    table.addCell("Unit/Unit of Issue");
    table.addCell("Beginning Balance");
    table.addCell("Total Received Quantity");
    table.addCell("Total Consumed Quantity");
    table.addCell("Total Losses / Adjustments");
    table.addCell("Stock on Hand");
    table.addCell("New Patients");
    table.addCell("Total Stockout days");
    table.addCell("Adjusted Total Consumption");
    table.addCell("Average Monthly Consumption(AMC)");
    table.addCell("Maximum Stock Quantity");
    table.addCell("Calculated Order Quantity");
    table.addCell("Requested Quantity");
    table.addCell("Requested Quantity Explanation");
    table.addCell("Approved Quantity");
    table.addCell("Packs to Ship");
    table.addCell("Price per pack");
    table.addCell("Total cost");
    table.addCell("Remarks");
    table.getDefaultCell().setBackgroundColor(null);
    table.setHeaderRows(1);

    String[] data = new String[]{"P10", "antibiotic Capsule 300/200/600 mg lorem ipsum lorem iprum",
      "Strip", "64375862", "89237498", "38472398", "123", "1122333", "23234", "34545", "21312", "213123", "234234",
      "234234", "234324", "Due to bad weather", "234234", "43234", "324324", "34234", "Remarks are this"};
    for (int i = 0; i < 1000; i++) {
      if (i % 2 == 0) {
        table.getDefaultCell().setBackgroundColor(Color.WHITE);
      } else {
        table.getDefaultCell().setBackgroundColor(Color.LIGHT_GRAY);

      }
      for (String text : data) {
        table.addCell(text);
      }
    }
    document.add(table);
    document.newPage();
    paragraph = new Paragraph();
    chunk = new Chunk("Summary :", FontFactory.getFont(FontFactory.TIMES, 30, Font.BOLD, Color.BLACK));
    paragraph.add(chunk);
    chunk = new Chunk("\n\nSubmitted By: Lokesh \t\t Date Submitted: 03/03/2013 \n\n Approved By: Lokesh \t\t Date Approved: 03/03/2012", FontFactory.getFont(FontFactory.TIMES, 20, Font.NORMAL, Color.BLACK));
    paragraph.add(chunk);
    document.add(paragraph);
    document.close();
  }

}