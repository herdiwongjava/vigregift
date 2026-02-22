function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const action = e.parameter.action;

  const data = JSON.parse(e.postData.contents);

  // ==============================
  // POST ORDER
  // ==============================
  if (action === "postOrder") {
    const sheetOrders = ss.getSheetByName("Orders");
    const sheetDetail = ss.getSheetByName("Detail_Order");

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
      let tanggalDelivery = "";

      if (data.deliveryType === "pickup") {
        alamatDelivery = "Ambil Sendiri";
      } else {
        if (data.useSeparateAddress) {
          alamatDelivery = product.delivery.address;
          tanggalDelivery = product.delivery.date;

        } else {
          alamatDelivery = data.deliveryGlobal.address;
          tanggalDelivery = data.deliveryGlobal.date;

        }
      }

      sheetDetail.appendRow([
        idOrder,
        product.id,
        product.name,
        product.qty,
        product.price,
        alamatDelivery,
        tanggalDelivery
      ]);
    });

    return output({
      status: "success",
      id: idOrder
    })

    // return ContentService
    //   .createTextOutput(JSON.stringify({
    //     status: "success",
    //     id: idOrder
    //   }))
    //   .setMimeType(ContentService.MimeType.JSON);
  }


  // ==============================
  // APPLY JOB
  // ==============================
  if (action === "applyJob") {
    const sheetTeam = ss.getSheetByName("Team");

    const idTeam = "TEAM-" + new Date().getTime();
    const dateApply = Utilities.formatDate(
      new Date(),
      "Asia/Makassar",
      "yyyy-MM-dd HH:mm:ss"
    );

    sheetTeam.appendRow([
      idTeam,
      data.id_job,
      data.nama_job,
      data.type_job,
      data.lokasi_job,
      data.nama,
      data.no_hp,
      data.jenis_kelamin,
      data.tanggal_lahir,
      data.alamat,
      data.kota,
      data.pendidikan,
      data.sekolah,
      data.jurusan,
      "Pengajuan",
      dateApply,
      data.pengalaman
    ]);

    return output({
      status: "success",
      message: "Lamaran berhasil dikirim",
      id: idTeam
    });
  }

  return output({ status: "invalid_action" });
}



//------------------------------------



function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const action = e.parameter.action;

  // ======================
  // GET ORDER BY ID
  // ======================
  if (action === "getOrder") {
    const sheetOrders = ss.getSheetByName("Orders");
    const sheetDetail = ss.getSheetByName("Detail_Order");

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




  // ======================
  // GET JOB
  // ======================
  if (action === "getJob") {
    const sheet = ss.getSheetByName("Job");
    const data = sheet.getDataRange().getValues();

    const headers = data[0];
    const rows = data.slice(1);

    const result = rows.map(row => {
      let obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });

    return output(result);
  }



  // ======================
  // GET APPLY BY ID
  // ======================
  if (action === "getApply") {
    const sheet = ss.getSheetByName("Team");
    const data = sheet.getDataRange().getValues();

    const id = e.parameter.id;

    const apply = data.find(row => row[0] === id);
    if (!apply) {
      return output({ status: "not_found" });
    }

    return output({
      status: "success",
      apply: apply,
    });
  }


  return output({ status: "invalid_action" });
}




function output(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

