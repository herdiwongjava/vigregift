// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export async function generateInvoicePdf(element, data) {
//   if (!element) throw new Error('No element to render');

//   const canvas = await html2canvas(element, { scale: 2 });
//   const imgData = canvas.toDataURL('image/png');

//   const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();

//   const imgProps = pdf.getImageProperties(imgData);
//   const imgWidth = pageWidth - 40;
//   const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//   pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
//   pdf.save(`Invoice-${(data?.order?.[0] || 'Invoice')}.pdf`);
// }

// export default generateInvoicePdf;


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateInvoicePdf(element, data) {
  if (!element) throw new Error('No element to render');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY // penting untuk mobile
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);

  const imgWidth = pageWidth - 40;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 20;

  // Page 1
  pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Next pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 20;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`Invoice-${(data?.order?.[0] || 'Invoice')}.pdf`);
}

export default generateInvoicePdf;