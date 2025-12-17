export const getReadableError = (error: any): string => {
  if (!error) return "Terjadi kesalahan tidak dikenal.";

  // Error dari MetaMask saat user menolak
  if (error.code === 4001 || error.code === "ACTION_REJECTED") {
    return "Transaksi dibatalkan oleh pengguna.";
  }

  // Error saldo tidak cukup
  if (error.message && (error.message.includes("insufficient funds") || error.code === "INSUFFICIENT_FUNDS")) {
    return "Saldo ETH tidak mencukupi untuk biaya gas.";
  }

  // Error jaringan
  if (error.message && error.message.includes("network")) {
    return "Gangguan jaringan. Periksa koneksi internet atau RPC URL Anda.";
  }

  // Error akses kontrak (OnlyOwner)
  if (error.message && error.message.includes("Ownable: caller is not the owner")) {
    return "Akses Ditolak: Hanya Admin yang dapat melakukan ini.";
  }

  // Error umum Ethers.js
  if (error.reason) return error.reason;
  if (error.message) return error.message;

  return "Gagal memproses transaksi. Silakan coba lagi.";
};