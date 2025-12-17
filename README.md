# Campus Point System - Web3 DApp

Aplikasi Web3 berbasis Next.js dan React untuk sistem poin dan sertifikat mahasiswa menggunakan blockchain Ethereum dengan smart contracts ERC20 dan ERC721.

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Ethers.js](https://img.shields.io/badge/Ethers.js-6.16.0-purple?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)

## 🚀 Quick Start

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Configure contract addresses di contracts/config.ts
# Edit CONTRACT_ADDRESSES dengan alamat contract yang sudah di-deploy

# Run development server
npm run dev

# Buka browser di http://localhost:3000
```

## Deskripsi Sistem

Sistem ini mengintegrasikan:
- **Token ERC20 (CampusPoint)**: Token untuk poin mahasiswa yang didapatkan dari kegiatan kampus
- **NFT ERC721 (ActivityCertificate)**: Sertifikat digital unik untuk setiap kegiatan
- **ActivityManager**: Smart contract pengelola kegiatan, reward, dan sertifikat

## Fitur Aplikasi

### 1. Halaman Login dengan Wallet Authentication
- Halaman login yang aman dengan MetaMask
- Redirect otomatis setelah koneksi berhasil
- Protected routes untuk keamanan

### 2. Koneksi Wallet MetaMask
- Connect/disconnect wallet MetaMask
- Deteksi jaringan (harus Sepolia Testnet Chain ID: 11155111)
- Menampilkan alamat wallet dan network yang terkoneksi
- Tombol switch network otomatis

### 3. Dashboard Mahasiswa
- **Tampilan Saldo Token ERC20**: Melihat saldo CampusPoint dengan refresh manual
- **NFT Kegiatan Saya**: Tampilan koleksi NFT sertifikat dari aktivitas yang pernah diikuti
- **Certificate Viewer**: Melihat detail sertifikat berdasarkan Token ID
- Layout responsif dengan card-based design

### 4. Admin Dashboard (Role-Based Access)
- **Access Control**: Hanya owner smart contract yang bisa mengakses
- **Create Activity**: Membuat kegiatan baru dengan nama dan poin reward
- **Activity List**: Melihat daftar semua aktivitas yang telah dibuat
- **Reward Student**: Memberikan reward poin kepada mahasiswa untuk aktivitas tertentu
- **Mint Certificate**: Minting NFT sertifikat untuk mahasiswa dengan metadata URI
- **Admin Badge**: Indikator alamat admin yang sedang login

## Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda sudah:

1. **Node.js** (v18 atau lebih baru)
2. **MetaMask** extension di browser
3. **Sepolia Testnet ETH** (bisa didapatkan dari faucet)
4. **Smart Contracts** yang sudah di-deploy ke Sepolia testnet

## Instalasi

### 1. Install Dependencies

```bash
npm install
```

Dependencies yang diinstall:
- `next` - Framework React
- `react` & `react-dom` - Library React
- `ethers` - Library untuk interaksi dengan Ethereum
- `typescript` - TypeScript support
- `tailwindcss` - CSS framework

## Konfigurasi

### 1. Get Sepolia Testnet ETH

Dapatkan ETH gratis untuk testing dari salah satu faucet berikut:
- [Sepolia Faucet by Alchemy](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
- [Sepolia PoW Faucet](https://sepolia-faucet.pk910.de/)

### 2. Setup MetaMask

1. Buka MetaMask
2. Sepolia testnet biasanya sudah tersedia di MetaMask. Jika belum, tambah jaringan:
   - **Network Name**: Sepolia Testnet
   - **New RPC URL**: `https://sepolia.infura.io/v3/YOUR_INFURA_KEY` atau gunakan RPC public
   - **Chain ID**: `11155111`
   - **Currency Symbol**: ETH
   - **Block Explorer URL**: `https://sepolia.etherscan.io`

3. Switch ke Sepolia network di MetaMask

### 3. Deploy Smart Contracts

Deploy ketiga smart contract ke Sepolia testnet menggunakan Remix IDE:

1. **CampusPoint.sol** (ERC20)
2. **ActivityCertificate.sol** (ERC721)
3. **ActivityManager.sol**

**Langkah Deploy di Remix:**
1. Buka [Remix IDE](https://remix.ethereum.org)
2. Compile contracts
3. Pilih environment: "Injected Provider - MetaMask"
4. Pastikan MetaMask terhubung ke Sepolia
5. Deploy contracts satu per satu
6. Catat alamat kontrak setelah deploy

### 4. Update Contract Addresses

Edit file `contracts/config.ts` dan masukkan alamat kontrak yang sudah di-deploy:

```typescript
export const CONTRACT_ADDRESSES = {
  CAMPUS_POINT: "0xYourCampusPointAddress",           // ERC20 Token
  ACTIVITY_CERTIFICATE: "0xYourActivityCertificateAddress",  // ERC721 NFT
  ACTIVITY_MANAGER: "0xYourActivityManagerAddress",   // Main Contract
};
```

Anda juga bisa mengupdate RPC URL jika menggunakan Infura/Alchemy:

```typescript
export const SEPOLIA_NETWORK = {
  chainId: 11155111,
  chainName: "Sepolia Testnet",
  rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
  // ... rest of config
};
```

**Penting:** Pastikan deploy contracts dalam urutan berikut:
1. Deploy **CampusPoint** (ERC20) terlebih dahulu
2. Deploy **ActivityCertificate** (ERC721)
3. Deploy **ActivityManager** dengan parameter:
   - `_campusPointAddress`: alamat CampusPoint contract
   - `_certificateAddress`: alamat ActivityCertificate contract
4. Transfer ownership dari CampusPoint ke ActivityManager
5. Transfer ownership dari ActivityCertificate ke ActivityManager

## Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## URL dan Endpoints

Setelah aplikasi berjalan, tersedia endpoints berikut:

- **`/`** - Dashboard Mahasiswa (protected route)
  - Tampilan saldo token
  - Koleksi NFT sertifikat
  - Certificate viewer

- **`/login`** - Halaman Login
  - Wallet authentication dengan MetaMask
  - Redirect ke dashboard setelah login

- **`/admin`** - Admin Dashboard (protected, owner only)
  - Create activities
  - Activity list
  - Reward students
  - Mint certificates

## Cara Menggunakan Aplikasi

### 1. Login dengan Wallet

1. Buka aplikasi di browser (`http://localhost:3000`)
2. Anda akan diarahkan ke halaman login
3. Klik tombol **"Connect with MetaMask"**
4. Approve koneksi di MetaMask popup
5. Pastikan terhubung ke Sepolia testnet (Chain ID: 11155111)
6. Jika network salah, klik tombol **"Switch to Sepolia"** yang akan muncul
7. Setelah terkoneksi, Anda akan otomatis diarahkan ke dashboard

### 2. Dashboard Mahasiswa

Setelah login sebagai mahasiswa:

#### a. Melihat Saldo CampusPoint
- Saldo token akan otomatis ditampilkan di card "Saldo Token"
- Klik tombol **"Refresh"** untuk memperbarui saldo
- Saldo ditampilkan dalam format desimal dengan 2 digit

#### b. Melihat Koleksi NFT
- Scroll ke section **"NFT Kegiatan Saya"**
- Semua NFT sertifikat yang Anda miliki akan ditampilkan
- Setiap card menampilkan: nama aktivitas, poin yang didapat, Token ID, dan Activity ID
- Klik **"Lihat Metadata"** untuk membuka metadata URI NFT

#### c. Melihat Detail Sertifikat Spesifik
1. Scroll ke section **"Certificate Viewer"**
2. Masukkan **Token ID** di form
3. Klik **"View Certificate"**
4. Detail sertifikat akan ditampilkan:
   - Token ID
   - Owner Address
   - Token URI (metadata link)

### 3. Admin Dashboard (Khusus Owner)

Untuk mengakses admin dashboard:
1. Login dengan wallet owner smart contract
2. Klik tombol **"Admin Panel"** di dashboard mahasiswa, atau
3. Akses langsung melalui URL: `http://localhost:3000/admin`

#### a. Membuat Aktivitas Baru
1. Scroll ke section **"Create Activity"**
2. Masukkan nama aktivitas (contoh: "Seminar Blockchain")
3. Masukkan poin reward (contoh: 100)
4. Klik **"Create Activity"**
5. Approve transaksi di MetaMask
6. Aktivitas baru akan muncul di Activity List

#### b. Memberikan Reward kepada Mahasiswa
1. Pilih **Activity ID** dari dropdown
2. Masukkan **Student Address** (alamat wallet mahasiswa)
3. Klik **"Reward Student"**
4. Approve transaksi di MetaMask
5. Mahasiswa akan menerima CampusPoint sesuai reward aktivitas

#### c. Minting NFT Sertifikat
1. Pilih **Activity ID** dari dropdown
2. Masukkan **Student Address**
3. Masukkan **Metadata URI** (contoh: `ipfs://QmHash...` atau URL lain)
4. Klik **"Mint Certificate"**
5. Approve transaksi di MetaMask
6. NFT sertifikat akan di-mint ke alamat mahasiswa

#### d. Melihat Daftar Aktivitas
- Section **"Activity List"** menampilkan semua aktivitas yang telah dibuat
- Informasi yang ditampilkan: ID, nama aktivitas, poin reward, status aktif

## Struktur Project

```
web3-campus-app/
├── app/
│   ├── login/
│   │   └── page.tsx        # Login page dengan wallet auth
│   ├── admin/
│   │   └── page.tsx        # Admin dashboard (role-based access)
│   ├── layout.tsx          # Root layout dengan Web3Provider
│   ├── page.tsx            # Main dashboard page (protected)
│   └── globals.css         # Global styles
├── components/
│   ├── admin/
│   │   ├── CreateActivity.tsx    # Form membuat aktivitas baru
│   │   ├── ActivityList.tsx      # List semua aktivitas
│   │   ├── RewardStudent.tsx     # Form reward mahasiswa
│   │   └── MintCertificate.tsx   # Form mint NFT sertifikat
│   ├── WalletConnect.tsx         # Komponen koneksi wallet
│   ├── TokenBalance.tsx          # Komponen tampilan saldo token
│   ├── CertificateViewer.tsx     # Komponen viewer sertifikat
│   ├── StudentNFTActivities.tsx  # Komponen koleksi NFT mahasiswa
│   └── ProtectedRoute.tsx        # HOC untuk protected routes
├── contexts/
│   └── Web3Context.tsx     # Context untuk state Web3
├── hooks/
│   ├── useCampusPoint.ts   # Hook untuk ERC20 interactions
│   ├── useActivityCertificate.ts # Hook untuk ERC721 interactions
│   └── useActivityManager.ts # Hook untuk ActivityManager interactions
├── contracts/
│   ├── CampusPointABI.ts   # ABI untuk ERC20
│   ├── ActivityCertificateABI.ts # ABI untuk ERC721
│   ├── ActivityManagerABI.ts # ABI untuk ActivityManager
│   └── config.ts           # Sepolia network & contract config
├── types/
│   └── ethereum.d.ts       # TypeScript declarations untuk MetaMask
└── utils/                  # Utility functions (jika ada)
```

## Teknologi yang Digunakan

- **Next.js 16.0.8** - React framework dengan App Router dan Turbopack
- **React 19.2.1** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Modern CSS framework dengan @tailwindcss/postcss
- **Ethers.js v6.16.0** - Ethereum library untuk interaksi blockchain
- **MetaMask** - Wallet provider untuk Web3 authentication
- **Babel React Compiler** - Optimasi performa React

## Testing Smart Contract Functions

### Testing ERC20 (CampusPoint)

Di Remix IDE atau console:

```solidity
// Mint tokens to address (owner only)
campusPoint.mint("0xStudentAddress", 1000000000000000000); // 1 token dengan 18 decimals

// Check balance
campusPoint.balanceOf("0xStudentAddress");
```

### Testing ERC721 (ActivityCertificate)

```solidity
// Mint certificate
activityCertificate.mintCertificate("0xStudentAddress", "ipfs://QmHash...");

// Get owner of token
activityCertificate.ownerOf(1);

// Get token URI
activityCertificate.tokenURI(1);
```

### Testing ActivityManager

```solidity
// Create activity (owner only)
activityManager.createActivity("Seminar Web3", 100);

// Get activity details
activityManager.getActivity(1);

// Reward student (owner only)
activityManager.rewardStudent(1, "0xStudentAddress");

// Mint certificate for activity (owner only)
activityManager.mintCertificate(1, "0xStudentAddress", "ipfs://QmHash...");

// Get activity count
activityManager.getActivityCount();

// Check if address is owner
activityManager.owner();
```

### Testing di Aplikasi Web

1. **Testing sebagai Mahasiswa:**
   - Login dengan wallet mahasiswa
   - Lihat saldo token (awalnya 0)
   - Lihat koleksi NFT (awalnya kosong)
   - Coba akses `/admin` (akan ditolak)

2. **Testing sebagai Admin:**
   - Login dengan wallet owner contract
   - Akses `/admin` (berhasil)
   - Create activity baru
   - Reward mahasiswa dengan activity ID
   - Mint certificate untuk mahasiswa
   - Cek di dashboard mahasiswa: saldo bertambah dan NFT muncul

## Fitur Utama dan Cara Kerja

### 1. Role-Based Access Control
Sistem membedakan dua jenis user:
- **Admin (Owner)**: Wallet yang men-deploy ActivityManager contract
  - Dapat create activities
  - Dapat reward students dengan token
  - Dapat mint NFT certificates
  - Akses penuh ke admin dashboard
- **Student (Regular User)**: Wallet biasa
  - Dapat melihat saldo token
  - Dapat melihat koleksi NFT sertifikat
  - Dapat view certificate details
  - Tidak bisa akses admin features

### 2. Activity Management System
Admin dapat:
- **Create Activity**: Membuat aktivitas dengan nama dan poin reward
- **View All Activities**: Melihat list semua aktivitas yang telah dibuat
- **Reward System**: Memberikan token kepada mahasiswa berdasarkan aktivitas
- **Certificate Minting**: Mint NFT sertifikat untuk mahasiswa

### 3. Student NFT Collection
Fitur `StudentNFTActivities` component:
- Menggunakan event listening (`CertificateMinted`) untuk fetch NFT
- Menampilkan semua NFT yang dimiliki mahasiswa
- Horizontal scrollable card layout
- Setiap card menampilkan: activity name, points, token ID, metadata URI
- Link ke IPFS metadata (support IPFS protocol)

### 4. Web3 Context dan Hooks
- **Web3Context**: Global state management untuk provider, signer, account, chainId
- **useCampusPoint**: Hook untuk ERC20 token interactions
- **useActivityCertificate**: Hook untuk ERC721 NFT interactions
- **useActivityManager**: Hook untuk activity management dan admin functions

## Troubleshooting

### MetaMask tidak terdeteksi
- Pastikan MetaMask extension sudah terinstall
- Refresh halaman browser
- Check console untuk error

### Wrong Network Error
- Pastikan MetaMask terhubung ke Sepolia testnet (Chain ID: 11155111)
- Klik tombol **"Switch to Sepolia"** di aplikasi
- Atau switch network manual di MetaMask

### Contract Error / Failed to fetch
- Pastikan contract addresses di `config.ts` sudah benar dan valid di Sepolia
- Verify contracts di [Sepolia Etherscan](https://sepolia.etherscan.io)
- Check apakah kontrak sudah di-deploy dengan benar

### Transaction Failed
- Pastikan account di MetaMask memiliki cukup Sepolia ETH untuk gas fees
- Dapatkan ETH gratis dari Sepolia faucet
- Pastikan fungsi yang dipanggil memiliki permission yang benar

### Redirect loop atau tidak bisa akses dashboard
- Clear browser cache dan cookies
- Disconnect wallet dari MetaMask dan connect ulang
- Pastikan sudah terkoneksi ke Sepolia network

### Tidak bisa akses Admin Dashboard
- Pastikan wallet yang login adalah owner dari ActivityManager contract
- Check owner address dengan memanggil `owner()` function di contract
- Jika perlu transfer ownership, gunakan `transferOwnership()` di Remix
- Access denied message akan muncul jika bukan owner

### NFT tidak muncul di dashboard mahasiswa
- Pastikan certificate sudah di-mint dengan benar
- Check di Sepolia Etherscan apakah transaksi mint berhasil
- Tunggu beberapa saat untuk event indexing
- Refresh halaman browser
- Check console browser untuk error messages

## Pengembangan Lanjutan

Fitur yang sudah ada:
- [x] Admin dashboard untuk create activity & reward students
- [x] List semua NFT yang dimiliki user
- [x] Role-based access control (Admin vs Student)
- [x] Activity management system

Fitur yang bisa ditambahkan:
- [ ] Transfer token antar user (peer-to-peer)
- [ ] Activity history timeline dengan filtering
- [ ] Upload metadata langsung ke IPFS dari aplikasi
- [ ] QR code generator untuk certificate verification
- [ ] PDF certificate generator dari NFT
- [ ] Notification system untuk reward baru
- [ ] Student leaderboard berdasarkan total poin
- [ ] Batch reward untuk multiple students sekaligus
- [ ] Activity categories dan tags
- [ ] Search dan filter activities
- [ ] Dark mode support
- [ ] Multi-language support (Indonesian/English)
- [ ] Export data ke CSV/Excel
- [ ] Analytics dashboard untuk admin

## 📝 Important Notes

### Security
- Aplikasi ini adalah prototype untuk keperluan akademik
- Jangan gunakan di production tanpa audit security yang proper
- Pastikan private key MetaMask tidak pernah dibagikan
- Gunakan Sepolia testnet untuk testing, bukan mainnet

### Smart Contract Ownership
- Owner dari ActivityManager contract memiliki kontrol penuh
- Hanya owner yang bisa:
  - Membuat aktivitas baru
  - Memberikan reward (mint token)
  - Mint NFT certificate
- Pastikan wallet owner aman dan memiliki backup

### Gas Fees
- Setiap transaksi blockchain membutuhkan gas fee (ETH)
- Pastikan wallet owner memiliki cukup Sepolia ETH
- Gas fees di Sepolia gratis (didapat dari faucet)
- Estimate gas untuk operations:
  - Create Activity: ~100,000 gas
  - Reward Student: ~80,000 gas
  - Mint Certificate: ~150,000 gas

### IPFS Metadata
- Metadata URI untuk NFT bisa menggunakan IPFS atau HTTP
- Format IPFS: `ipfs://QmHash...`
- Aplikasi otomatis convert IPFS ke gateway untuk viewing
- Untuk upload ke IPFS, bisa gunakan:
  - [Pinata](https://pinata.cloud)
  - [NFT.Storage](https://nft.storage)
  - [Web3.Storage](https://web3.storage)

## Lisensi

Project ini dibuat untuk keperluan akademik - Universitas Kristen Duta Wacana 2025

## Author

Tugas Akhir - Program Studi Informatika FTI UKDW

---

**Happy Coding! 🚀**
