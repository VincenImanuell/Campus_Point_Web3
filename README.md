# Campus Point System - Web3 DApp

Aplikasi Web3 berbasis Next.js dan React untuk sistem poin dan sertifikat mahasiswa menggunakan blockchain Ethereum dengan smart contracts ERC20 dan ERC721.

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

### 3. Tampilan Saldo Token ERC20
- Melihat saldo CampusPoint
- Refresh balance secara manual
- Menampilkan nama dan simbol token

### 4. Certificate Viewer (NFT ERC721)
- Melihat detail sertifikat berdasarkan Token ID
- Menampilkan owner address
- Menampilkan metadata URI (tokenURI)

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
  CAMPUS_POINT: "0xYourCampusPointAddress",
  ACTIVITY_CERTIFICATE: "0xYourActivityCertificateAddress",
  ACTIVITY_MANAGER: "0xYourActivityManagerAddress",
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

## Cara Menggunakan Aplikasi

### 1. Login dengan Wallet

1. Buka aplikasi di browser (`http://localhost:3000`)
2. Anda akan diarahkan ke halaman login
3. Klik tombol **"Connect with MetaMask"**
4. Approve koneksi di MetaMask popup
5. Pastikan terhubung ke Sepolia testnet (Chain ID: 11155111)
6. Jika network salah, klik tombol **"Switch to Sepolia"** yang akan muncul
7. Setelah terkoneksi, Anda akan otomatis diarahkan ke dashboard

### 2. Melihat Saldo CampusPoint

Setelah wallet terkoneksi:
- Saldo token akan otomatis ditampilkan
- Klik tombol **"Refresh"** untuk memperbarui saldo
- Saldo ditampilkan dalam format desimal dengan 2 digit

### 3. Melihat Sertifikat NFT

1. Masukkan **Token ID** di form Certificate Viewer
2. Klik **"View Certificate"**
3. Detail sertifikat akan ditampilkan:
   - Token ID
   - Owner Address
   - Token URI (metadata link)

## Struktur Project

```
web3-campus-app/
├── app/
│   ├── login/
│   │   └── page.tsx        # Login page dengan wallet auth
│   ├── layout.tsx          # Root layout dengan Web3Provider
│   ├── page.tsx            # Main dashboard page (protected)
│   └── globals.css         # Global styles
├── components/
│   ├── WalletConnect.tsx   # Komponen koneksi wallet
│   ├── TokenBalance.tsx    # Komponen tampilan saldo token
│   ├── CertificateViewer.tsx # Komponen viewer sertifikat
│   └── ProtectedRoute.tsx  # HOC untuk protected routes
├── contexts/
│   └── Web3Context.tsx     # Context untuk state Web3
├── hooks/
│   ├── useCampusPoint.ts   # Hook untuk ERC20 interactions
│   └── useActivityCertificate.ts # Hook untuk ERC721 interactions
├── contracts/
│   ├── CampusPointABI.ts   # ABI untuk ERC20
│   ├── ActivityCertificateABI.ts # ABI untuk ERC721
│   ├── ActivityManagerABI.ts # ABI untuk ActivityManager
│   └── config.ts           # Sepolia network & contract config
└── types/
    └── ethereum.d.ts       # TypeScript declarations untuk MetaMask
```

## Teknologi yang Digunakan

- **Next.js 15** - React framework dengan App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Ethers.js v6** - Ethereum library
- **MetaMask** - Wallet provider

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
// Create activity
activityManager.createActivity("Seminar Web3", 100);

// Reward student
activityManager.rewardStudent(1, "0xStudentAddress");

// Mint certificate for activity
activityManager.mintCertificate(1, "0xStudentAddress", "ipfs://QmHash...");
```

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

## Pengembangan Lanjutan

Fitur yang bisa ditambahkan:
- [ ] Admin dashboard untuk create activity & reward students
- [ ] List semua NFT yang dimiliki user
- [ ] Transfer token antar user
- [ ] Activity history timeline
- [ ] Upload metadata ke IPFS
- [ ] QR code untuk certificate verification
- [ ] Mobile responsive improvements
- [ ] Dark mode support

## Lisensi

Project ini dibuat untuk keperluan akademik - Universitas Kristen Duta Wacana 2025

## Author

Tugas Akhir - Program Studi Informatika FTI UKDW

---

**Happy Coding! 🚀**
