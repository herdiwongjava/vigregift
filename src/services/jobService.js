const BASE_URL = import.meta.env.VITE_URL_SPREADSHEET;


export async function applyJob(payload) {
  // console.log('applyJob payload', payload);
  const response = await fetch(`${BASE_URL}?action=applyJob`,
    {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengirim lamaran");
  }

  return await response.json();
}



export async function getAllJobs() {
  try {
    const res = await fetch(`${BASE_URL}?action=getJob`);
    
    if (!res.ok) {
      throw new Error("Gagal mengambil data lowker");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Format data tidak sesuai");
    }

    return data;

  } catch (error) {
    console.error("Error getAllJobs:", error);
    throw error;
  }
}


export async function getApplyById(id) {
  try {
    const url = `${BASE_URL}?action=getApply&id=${encodeURIComponent(id)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch order');
    // console.log('getApply :',res);
    const data = await res.json();


    // if (!Array.isArray(data)) {
    //   throw new Error("Format data tidak sesuai");
    // }

    return data;
  } catch (err) {
    console.warn('getApplyById failed', err);
    throw err;
  }

}

// optional: filter by kota
// export async function getJobsByKota(kota) {
//   try {
//     const response = await fetch(`${BASE_URL}?kota=${encodeURIComponent(kota)}`);
    
//     if (!response.ok) {
//       throw new Error("Gagal mengambil data lowker");
//     }

//     return await response.json();

//   } catch (error) {
//     console.error("Error getJobsByKota:", error);
//     throw error;
//   }
// }