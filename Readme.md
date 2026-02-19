# Kode Apps Script "OerdersVigreGift" pada extensi spreadsheet :

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetOrders = ss.getSheetByName("Orders");
  const sheetDetail = ss.getSheetByName("Detail_Order");

  const data = JSON.parse(e.postData.contents);

  const idOrder = "ORD-" + new Date().getTime();
  const now = new Date();

  // ===== SIMPAN KE SHEET ORDERS =====
  sheetOrders.appendRow([
    idOrder,
    now,
    data.nama,
    data.ig,
    data.phone,
    data.total,
    data.dp,
    "On Check",              // STATUS_PEMBAYARAN
    data.deliveryType === "pickup" 
      ? data.pickupDate 
      : data.deliveryGlobal?.date || "Per Item",
    "Pending"                // STATUS_ORDER
  ]);

  // ===== SIMPAN KE DETAIL_ORDER =====
  data.products.forEach(product => {

    let alamatDelivery = "";

    if (data.deliveryType === "pickup") {
      alamatDelivery = "Ambil Sendiri";
    } else {
      if (data.useSeparateAddress) {
        alamatDelivery = product.delivery.address + 
                         " | " + product.delivery.date;
      } else {
        alamatDelivery = data.deliveryGlobal.address + 
                         " | " + data.deliveryGlobal.date;
      }
    }

    sheetDetail.appendRow([
      idOrder,
      product.id,
      product.name,
      product.qty,
      product.price,
      alamatDelivery
    ]);
  });

  return ContentService
    .createTextOutput(JSON.stringify({
      status: "success",
      id: idOrder
    }))
    .setMimeType(ContentService.MimeType.JSON);
}


function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetOrders = ss.getSheetByName("Orders");
  const sheetDetail = ss.getSheetByName("Detail_Order");

  const action = e.parameter.action;

  if (action === "getOrder") {
    const id = e.parameter.id;

    const ordersData = sheetOrders.getDataRange().getValues();
    const detailData = sheetDetail.getDataRange().getValues();

    const order = ordersData.find(row => row[0] === id);
    if (!order) {
      return output({ status: "not_found" });
    }

    const details = detailData.filter(row => row[0] === id);

    return output({
      status: "success",
      order: order,
      details: details
    });
  }

  return output({ status: "invalid_action" });
}

function output(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
