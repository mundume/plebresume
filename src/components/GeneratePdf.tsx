import { jsPDF } from "jspdf";
import { toCanvas, toPng } from "html-to-image";

const GeneratePDF = ({ html }: { html?: React.RefObject<HTMLDivElement> }) => {
  const handlePDF = async () => {
    const doc = new jsPDF("p", "pt", "letter", false);
    // do whatever you want in your pdf and finally save your pdf
    doc.save("mypdf.pdf");
  };

  const generateImage = async () => {
    // @ts-ignore
    const image = await toPng(html.current, { quality: 1 });
    const doc = new jsPDF("p", "pt", "a4", false);

    doc.addImage(image, "PNG", 0, 0, 612, 792);
    doc.save();
  };
  return <button onClick={generateImage}>Generate PDF</button>;
};

export default GeneratePDF;
