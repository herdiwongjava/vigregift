Saya akan menambahkan fitur Order pada project React Vite ini.
Jangan mengubah apapun pada existing component, logic, routing, styling, atau API selain yang benar-benar diperlukan untuk menambahkan fitur ini.

Environment variable (.env) sudah berisi:
VITE_SPREADSHEET_ID
VITE_SPREADSHEET_URL

Struktur API Google Apps Script dapat dilihat pada file Readme.md dan harus diikuti sesuai format request/response yang sudah ada.

🔹 1. Tambahkan tombol "Order"
Letakkan tombol "Order" pada navbar, di sebelah kanan tombol "Konsultasi Hampers".

🔹 2. Halaman Order
Saat tombol diklik, arahkan ke halaman baru /order dengan UI berikut:

A. Cek Order
Search bar di tengah halaman

Input nomor order
Tombol "Cari"

Jika ditemukan, tampilkan invoice:
Data dari sheet Orders
Data produk dari sheet Detail_Order
Join berdasarkan ID_ORDER
Tampilkan dalam layout invoice
Sediakan tombol "Download PDF"
Generate PDF di frontend (tanpa backend tambahan)

B. Tombol "Buat Order Baru"
Membuka formulir multi-step form (wizard style):
Hanya 1 field per step
Ada tombol Next / Previous
Ada progress indicator
Semua state tersimpan dalam 1 object order
Submit hanya di Step terakhir

🔹 Struktur Form
Step 1 → "Boleh tau dengan kakak Siapa yang Order?"
Step 2 → "Kasih tau nama IG nya dong kak"
Step 3 → "Sekalian Nomor WA kakak buat kita saling kordinasi"

Step 4 → "Pilih-pilih Item yang mau di order ya kak"
Note: Ambil produk dari Contentful

Tampilkan list vertikal
Kiri: gambar
Tengah: nama produk
Kanan: input qty

Simpan:
id produk
nama produk
qty
harga (normal atau promo)

Step 5 →  "Apakah ingin kami kirim atau di ambil sendiri kak?"
Pilih: (Kirim /Ambil)

Jika Ambil:
Step 6a → "Isi tanggal ambilnya ya kak"
Note : munculkan inputan date


Jika Kirim:
Step 6b → Tanya:
"Apakah setiap produk dikirim ke alamat berbeda?"

Jika Tidak:
Step 7a → "Isi alamat kirim dan tanggalnya ya kak"
Note : munculkan 2 inputan (date dan text untuk alamat)


Jika Ya:
Step 7b → "Isi alamat kirim dan tanggalnya ya kak"
Note : Loop setiap produk munculkan 2 inputan (date dan text untuk alamat)
Next
Loop per produk munculkan 2 inputan (date dan text untuk alamat)
sampai produk habis


Step 8 → "Ini totalnya ya kak, ingin DP Berapa Nih"
Note : Hitung total otomatis (qty × harga)
Tampilkan total
Input nominal DP


🔹 Penyimpanan Data
Saat submit:
Simpan ke Google Spreadsheet dengan struktur:

Sheet: Orders
(ID_ORDER, TANGGAL, NAMA, IG, PHONE, TOTAL, DP, STATUS_PEMBAYARAN, TANGGAL_DELIVERY, STATUS_ORDER)

Sheet: Detail_Order
(ID_ORDER, ID_PRODUK, NAMA_PRODUK, QTY, HARGA, ALAMAT_DELIVERY)

Gunakan ID_ORDER yang dihasilkan dari Apps Script
Jangan ubah struktur spreadsheet
Jangan ubah struktur API yang sudah ada

Note : Jangan mengubah existing component, logic, styling, routing, atau API selain yang diperlukan untuk menambahkan fitur ini.