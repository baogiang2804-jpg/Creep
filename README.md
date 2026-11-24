# Creep – Key 1 player

Trình phát đệm piano & pad cho bài **Creep** (Key 1 player), chạy hoàn toàn trên trình duyệt bằng **Web Audio API** — không cần file âm thanh ngoài hay thư viện bên thứ ba.

## Tính năng

- **Vòng hợp âm chuẩn**: `G → B → C → Cm` với 4 ô nhịp hiển thị trực quan và 4 chấm đếm phách mỗi ô nhịp.
- **4 phần bài hát**:
  - **Verse**: rải nốt nhẹ, piano êm, chừa chỗ cho guitar và giọng hát.
  - **Chorus**: dập hợp âm dày, thêm lớp pad nền kéo dài cả ô nhịp.
  - **Bridge**: cao trào, dập đều từng nốt móc đơn, pad dày hơn.
  - **Outro**: thưa dần và nhỏ dần qua từng ô nhịp.
- **Bàn phím piano tương tác (`G3 – C5`)**: tự động sáng phím theo nốt đang phát và cho phép chạm/click trực tiếp để nghe thử từng phím.
- **Metronome & Sus4**: bật/tắt tiếng gõ nhịp và biến thể hợp âm `sus4` (`G`, `B`, `C`).
- **Tempo**: điều chỉnh mượt từ `65` đến `115 BPM` (mặc định `92 BPM`).
- **Giao diện Sáng / Tối tự động** theo hệ thống (`prefers-color-scheme`).

## Chạy cục bộ (Local)

Bạn có thể mở trực tiếp file `index.html` trong trình duyệt, hoặc chạy qua Vite dev server:

```bash
npm install
npm run dev
```

Build bản production vào thư mục `dist/`:

```bash
npm run build
```

## Đẩy dự án lên GitHub

1. Khởi tạo Git và commit toàn bộ mã nguồn:

```bash
git init
git add .
git commit -m "Initial commit: Creep – Key 1 player"
```

2. Tạo một repository mới trên GitHub, sau đó liên kết và đẩy lên:

```bash
git branch -M main
git remote add origin https://github.com/<ten-nguoi-dung>/<ten-repo>.git
git push -u origin main
```

## Tự động deploy lên GitHub Pages

Repository đã kèm sẵn workflow tại `.github/workflows/deploy.yml`:

1. Vào **Settings → Pages** trong repository GitHub của bạn.
2. Ở mục **Build and deployment → Source**, chọn **GitHub Actions**.
3. Mỗi lần push lên nhánh `main`, GitHub Actions sẽ tự động build (`npm run build`) và deploy trang web lên GitHub Pages.

## Cấu trúc chính

- `index.html`: Trang **Tổng hợp** — giữ nguyên bản code HTML/CSS/JS của **Creep – Key 1 player**.
- `tay-trai.html`: Trang **Tay trái (band-safe)** — giữ nguyên bản code từ tệp tay trái.
- `tay-phai.html`: Trang **Tay phải** — giữ nguyên bản code từ tệp tay phải.
- `public/assets/aistudio/`: Thư mục lưu nguyên vẹn 3 tệp HTML gốc đính kèm.
- `.github/workflows/deploy.yml`: Cấu hình CI/CD tự động deploy GitHub Pages.
- `vite.config.ts`: Cấu hình Vite multi-page (`index.html`, `tay-trai.html`, `tay-phai.html`) với `base: './'` để tương thích đường dẫn con của GitHub Pages.
- `LICENSE`: Giấy phép MIT.
