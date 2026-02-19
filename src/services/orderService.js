const BASE_URL = import.meta.env.VITE_URL_SPREADSHEET;

export async function createOrder(payload) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('createOrder error', err);
    throw err;
  }
}

export async function getOrderById(id) {
  try {
    const url = `${BASE_URL}?action=getOrder&id=${encodeURIComponent(id)}`;
    const res = await fetch(url);
    // console.log('getOrder :',res);
    if (!res.ok) throw new Error('Failed to fetch order');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('getOrderById failed', err);
    throw err;
  }

}
