import html2canvas from "html2canvas";
import jsPDF from "jspdf";

let isDownloadInProgress = false;

export const handleDownloadClick = (setPDFData) => {
  // if (isDownloadInProgress) {
  //   return;
  // }

  // isDownloadInProgress = true;

  const content = document.getElementById("content-to-download");
  if (content) {
    setTimeout(() => {
      html2canvas(content, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const imgCanvas = canvas.toDataURL("test.pdf", 1.0);
        const pdfWidth = canvas.width / 2;
        const pdfHeight = canvas.height / 2;
        const marginTop = 50;
        const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight * 1.02]);
        pdf.addImage(imgCanvas, "PNG", 0, marginTop, pdfWidth, pdfHeight);
        setPDFData(pdf);
        // if (flag) {
        //   pdf.addImage(imgCanvas, "PNG", 0, marginTop, pdfWidth, pdfHeight);
        // } else {
        //   const pageHeight = pdf.internal.pageSize.getHeight() - marginTop;
        //   const contentHeight = pdfHeight - marginTop;

        //   if (contentHeight <= pageHeight) {
        //     pdf.addImage(imgCanvas, "PNG", 0, marginTop, pdfWidth, pdfHeight);
        //   } else {
        //     const pageContentHeight = pageHeight;
        //     pdf.addImage(
        //       imgCanvas,
        //       "PNG",
        //       0,
        //       marginTop,
        //       pdfWidth,
        //       pageContentHeight
        //     );
        //   }
        // }
        // pdf.save("evaluation.pdf");
        // isDownloadInProgress = false;
      });
    }, 500);
  }
};
