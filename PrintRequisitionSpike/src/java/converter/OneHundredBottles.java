package converter;

import org.w3c.dom.Document;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.StringBufferInputStream;


public class OneHundredBottles {
  public static void main(String[] args) throws Exception {
    StringBuffer buf = new StringBuffer();
    buf.append("<html>");
    buf.append("<head><style language='text/css'>");
    buf.append("h3 { border: 1px solid #aaaaff; background: #ccccff; ");
    buf.append("padding: 1em; text-transform: capitalize; font-family: sansserif; font-weight: normal;}");
    buf.append("p { margin: 1em 1em 4em 3em; } p:first-letter { color: red; font-size: 150%; }");
    buf.append("h2 { background: #5555ff; color: white; border: 10px solid black; padding: 3em; font-size: 200%; }");
    buf.append("</style></head>");
    buf.append("<body>");
//    buf.append("<p><img src='100bottles.jpg'/></p>");
    for (int i = 99; i > 0; i--) {
      buf.append("<h3>" + i + " bottles of beer on the wall, " + i + " bottles of beer!</h3>");
      buf.append("<p>Take one down and pass it around, " + (i - 1) + " bottles of beer on the wall</p>\n");
    }
    buf.append("<h2>No more bottles of beer on the wall, no more bottles of beer. ");
    buf.append("Go to the store and buy some more, 99 bottles of beer on the wall.</h2>");
    buf.append("</body>");
    DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
    Document doc = builder.parse(new StringBufferInputStream(buf.toString()));
    ITextRenderer renderer = new ITextRenderer();
    renderer.setDocument(doc, null);
    String outputFile = "100bottles.pdf";
    OutputStream os = new FileOutputStream(outputFile);
    renderer.layout();
    renderer.createPDF(os);
    os.close();
  }
}