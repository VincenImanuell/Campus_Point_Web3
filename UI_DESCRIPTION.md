# Campus Point System - UI Frontend Description

> **Deskripsi lengkap UI frontend untuk sistem poin dan sertifikat mahasiswa berbasis Web3 blockchain**
> 
> Dokumen ini mendeskripsikan semua komponen UI, halaman, dan fungsi untuk membangun interface yang modern, intuitif, dan user-friendly.

---

## 📋 Overview Sistem

**Nama Aplikasi:** Campus Point System - Web3 DApp

**Tujuan:** Sistem manajemen poin dan sertifikat digital mahasiswa berbasis blockchain Ethereum dengan smart contracts (ERC20 untuk token poin, ERC721 untuk sertifikat NFT).

**Target Users:**
1. **Mahasiswa** - Melihat poin, sertifikat, dan berinteraksi dengan wallet
2. **Admin** - Mengelola kegiatan, memberikan reward, dan mencetak sertifikat

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Ethers.js v6
- MetaMask (Web3 Wallet)
- Sepolia Testnet (Ethereum)

---

## 🎨 Design System & Aesthetics

### Color Palette
- **Primary:** Blue gradients (from-blue-600 to-purple-600)
- **Secondary:** Purple/Pink gradients (from-purple-600 to-pink-600)
- **Success:** Green tones (green-600, green-50 backgrounds)
- **Warning:** Yellow tones (yellow-600, yellow-50 backgrounds)
- **Error:** Red tones (red-600, red-50 backgrounds)
- **Neutral:** Gray scale (gray-50 to gray-900)

### Visual Style
- **Modern & Clean:** Minimalist design dengan white cards, subtle shadows
- **Gradient Backgrounds:** Soft gradient backgrounds (from-blue-50 via-white to-purple-50)
- **Rounded Corners:** Semua card menggunakan rounded-lg atau rounded-xl
- **Icon-based:** Setiap section memiliki SVG icon yang meaningful
- **Responsive:** Mobile-first design dengan grid layout yang adaptif

### Typography
- **Headings:** Bold, gradient-friendly (text-3xl, text-2xl)
- **Body:** Clean sans-serif (text-sm, text-base)
- **Code/Address:** Monospace font untuk wallet address dan data blockchain

### Components Pattern
- Card-based layout dengan shadow-md
- Consistent spacing (p-6, mb-6, space-y-4)
- Hover effects pada buttons dan interactive elements
- Loading states dengan spinning animations
- Success/Error messages dengan icon dan colored backgrounds

---

## 📱 Halaman & Komponen UI

### 1. LOGIN PAGE (`/login`)

**Tujuan:** Halaman autentikasi menggunakan MetaMask wallet

**Visual Design:**
- **Background:** Full-screen gradient (from-blue-600 via-purple-600 to-pink-600)
- **Animated Elements:** Pulse animation pada background blur circles
- **Card:** White card dengan shadow-2xl, rounded-2xl, centered

**Layout:**
```
┌─────────────────────────────────────────┐
│   [Gradient Background with Animations] │
│                                          │
│    ╔════════════════════════════╗       │
│    ║  [Campus Logo Icon]        ║       │
│    ║                            ║       │
│    ║  Welcome to Campus Point   ║       │
│    ║  [Subtitle Text]           ║       │
│    ║                            ║       │
│    ║  ✓ Secure Authentication   ║       │
│    ║  ✓ Sepolia Testnet         ║       │
│    ║  ✓ Track Your Points       ║       │
│    ║                            ║       │
│    ║  [Connect MetaMask Button] ║       │
│    ║                            ║       │
│    ║  [Info Box - Need MetaMask?] ║     │
│    ╚════════════════════════════╝       │
│                                          │
│   [Footer - University Name]             │
└─────────────────────────────────────────┘
```

**Komponen & Fungsi:**

1. **Header Section**
   - Icon: Campus logo dengan gradient background (w-20 h-20)
   - Title: "Welcome to Campus Point" (text-3xl, bold)
   - Subtitle: Deskripsi singkat sistem

2. **Features List**
   - 3 bullet points dengan checkmark icon
   - Text: Secure Authentication, Sepolia Testnet, Track Your Points
   - Visual: Green checkmark icons dengan gray background

3. **Connect Button**
   - Text: "Connect with MetaMask"
   - Style: Gradient blue to purple, full width, rounded-xl
   - States:
     - Normal: Gradient dengan hover animation (scale-105)
     - Loading: Spinning icon + "Connecting..." text
     - Disabled: Gray gradient
   - Icon: User profile icon

4. **Connection Status**
   - Jika sudah connected: Green banner "Wallet Connected" + "Redirecting to dashboard..."
   - Pulsing green dot animation

5. **Error Handling**
   - Red banner dengan error icon
   - Error message ditampilkan
   - Border-left accent

6. **Info Box**
   - Blue background (bg-blue-50)
   - Link ke metamask.io untuk install
   - Info icon

**User Flow:**
1. User membuka halaman → Melihat form login
2. Klik "Connect with MetaMask" → MetaMask popup muncul
3. User approve koneksi → Cek network (harus Sepolia)
4. Jika wrong network → Tampilkan error + tombol switch network
5. Jika berhasil → Auto redirect ke dashboard (/)

---

### 2. MAIN DASHBOARD - Student View (`/`)

**Tujuan:** Halaman utama untuk mahasiswa melihat saldo poin dan sertifikat

**Visual Design:**
- **Background:** Soft gradient (from-blue-50 via-white to-purple-50)
- **Layout:** Header + Info Banner + Card Grid

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ HEADER                                          │
│ [Campus Icon] Campus Point System [Admin Btn?] │
│ Blockchain-based Student Points & Certificates  │
├─────────────────────────────────────────────────┤
│ [Info Banner - Important: Sepolia Network]     │
├─────────────────────────────────────────────────┤
│                                                 │
│ [Wallet Connection Card - Full Width]          │
│                                                 │
│ ┌──────────────────┐  ┌──────────────────┐    │
│ │ Token Balance    │  │ How It Works     │    │
│ │                  │  │                  │    │
│ └──────────────────┘  └──────────────────┘    │
│                                                 │
│ [Certificate Viewer Card - Full Width]         │
│                                                 │
│ [Smart Contract Architecture Info]             │
│                                                 │
├─────────────────────────────────────────────────┤
│ FOOTER - University Name                       │
└─────────────────────────────────────────────────┘
```

**Komponen Detail:**

#### A. Header
- **Logo Icon:** Gradient rounded square dengan graduation cap SVG
- **Title:** "Campus Point System" (text-3xl, bold)
- **Subtitle:** "Blockchain-based Student Points & Certificate Management"
- **Admin Button (Conditional):**
  - Hanya muncul jika user adalah owner/admin
  - Gradient purple to pink
  - Text: "Admin Dashboard" dengan user icon
  - Navigate ke `/admin`

#### B. Info Banner
- **Style:** Blue background (bg-blue-50), border-left-4 border-blue-500
- **Icon:** Info icon
- **Text:** Reminder untuk connect ke Sepolia testnet
- **Code snippet:** Highlight file path `contracts/config.ts`

#### C. Wallet Connection Component
- **Card Style:** White bg, shadow-md, rounded-lg
- **Title:** "Wallet Connection"

**State 1 - Not Connected:**
- Deskripsi: "Connect your MetaMask wallet to interact..."
- Button: Blue "Connect MetaMask"
- Error display jika ada

**State 2 - Connected:**
- Green banner dengan pulsing dot
- Display info:
  - **Address:** Formatted (0x1234...5678)
  - **Network:** 
    - Sepolia (11155111) → Green text
    - Wrong Network (Other) → Red text
- Warning box jika wrong network:
  - Yellow background
  - "Switch to Sepolia" button
- Disconnect button (gray)

#### D. Token Balance Component
- **Card Style:** White bg, shadow-md
- **Header:** "Campus Points Balance" + Refresh button
- **Refresh Button:** Blue, small, di kanan atas

**Display Style:**
- Gradient background (from-blue-50 to-indigo-50)
- Large number: Balance (text-5xl, bold, blue-600)
- Symbol: "POINTS" atau nama token (text-2xl)
- Token name di bawah
- Info text: "This balance represents your participation points..."
- Border: blue-100

**States:**
- Loading: "Refreshing..." disabled button
- Error: Red box dengan error message + hint untuk cek config
- Success: Display balance dengan 2 decimal places

#### E. How It Works Component
- **Card Style:** White bg, shadow-md
- **Title:** "How It Works" (text-2xl, bold)

**Content:**
- 3 numbered steps dengan colored circles:
  1. **Blue circle:** "Connect Your Wallet" + deskripsi
  2. **Purple circle:** "View Your Points" + deskripsi
  3. **Pink circle:** "View Certificates" + deskripsi
- Setiap step memiliki icon, title (bold), dan description

#### F. Certificate Viewer Component
- **Card Style:** White bg, shadow-md
- **Title:** "Certificate Viewer"
- **Form:**
  - Input: Token ID (border-gray-300, focus:ring-blue-500)
  - Placeholder: "Enter NFT Token ID (e.g., 1)"
  - Button: Blue "View Certificate"
  - Layout: Flex row (responsive ke column di mobile)

**Display Result:**
- Gradient background (from-purple-50 to-pink-50)
- Border: purple-200
- Certificate icon (purple)
- **Details:**
  1. **Token ID:** Large, monospace
  2. **Owner Address:** Small, monospace, breakable
  3. **Token URI:** Link jika HTTP, atau text jika IPFS
- Footer info: "This NFT certificate represents participation..."

**Empty State:**
- Large document icon (gray-400)
- Text: "Enter a Token ID to view certificate details"

**Error State:**
- Red box dengan error message

#### G. Smart Contract Architecture Info
- **Style:** Gray gradient background (from-gray-50 to-gray-100)
- **Layout:** 3 column grid (responsive ke 1 column)
- **Cards:**
  1. **CampusPoint (ERC20)** - Blue header
  2. **ActivityCertificate (ERC721)** - Purple header
  3. **ActivityManager** - Pink header
- Masing-masing card: White bg, small description

#### H. Footer
- White background, border-top
- Center aligned text
- "Web3 Campus Point System - Universitas Kristen Duta Wacana 2025"

---

### 3. ADMIN DASHBOARD (`/admin`)

**Tujuan:** Halaman untuk admin mengelola kegiatan, reward, dan sertifikat

**Access Control:**
- Cek apakah user adalah owner contract
- Jika bukan admin → Redirect ke `/` atau tampilkan "Access Denied" page

**Visual Design:**
- Similar gradient background
- Purple/Pink theme untuk admin (berbeda dari student blue)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ ADMIN HEADER                                     │
│ [Admin Icon] Admin Dashboard [Student View Btn  │
│ Manage activities, rewards, and certificates    │
│ [Admin Address Badge]                           │
├─────────────────────────────────────────────────┤
│                                                 │
│ [Create New Activity Card - Full Width]        │
│                                                 │
│ ┌──────────────────┐  ┌──────────────────┐    │
│ │ Reward Student   │  │ Mint Certificate │    │
│ │                  │  │                  │    │
│ └──────────────────┘  └──────────────────┘    │
│                                                 │
├─────────────────────────────────────────────────┤
│ FOOTER - Admin Panel                           │
└─────────────────────────────────────────────────┘
```

**Loading State:**
- Saat cek admin status: Spinner + "Checking admin access..."

**Access Denied State:**
- Red/Orange gradient background
- Large red circle dengan X icon
- "Access Denied" title
- "You don't have admin privileges..." message
- Blue button "Go to Dashboard"

**Komponen Detail:**

#### A. Admin Header
- **Icon:** Purple/Pink gradient dengan users icon
- **Title:** "Admin Dashboard" (bold)
- **Subtitle:** "Manage activities, rewards, and certificates"
- **Student View Button:** Gray button, navigate ke `/`
- **Admin Info Badge:**
  - Purple background (bg-purple-50)
  - Border purple-200
  - Display: "Admin Address: 0x1234...5678" (shortened)
  - Code styling untuk address

#### B. Create Activity Component
- **Card Style:** White bg, shadow-md
- **Icon:** Blue circle dengan plus icon
- **Title:** "Create New Activity"
- **Description:** "Register a new campus activity with point rewards..."

**Form Fields:**
1. **Activity Name:**
   - Label: "Activity Name"
   - Input: Text, placeholder "e.g., Web3 Workshop 2025"
   - Required field
   - Focus ring-blue-500

2. **Point Reward:**
   - Label: "Point Reward"
   - Input: Number, min=1, placeholder "e.g., 100"
   - Helper text: "Points that students will receive..."
   - Required field

**Submit Button:**
- Full width, blue background
- Text: "Create Activity" dengan plus icon
- Loading state: Spinner + "Creating Activity..."
- Disabled jika form invalid

**Feedback:**
- Success: Green box dengan checkmark + "Activity created successfully!"
- Error: Red box dengan X icon + error message

#### C. Reward Student Component
- **Card Style:** White bg, shadow-md
- **Icon:** Green circle dengan dollar/coin icon
- **Title:** "Reward Student"
- **Description:** "Give Campus Points to students who participated..."

**Form Fields:**
1. **Activity ID:**
   - Label: "Activity ID"
   - Input: Number, min=1
   - Real-time feedback: Fetch activity info saat user input
   - Display: "Activity Name - X points ✓" (green text)
   - Focus ring-green-500

2. **Student Wallet Address:**
   - Label: "Student Wallet Address"
   - Input: Text, monospace, placeholder "0x..."
   - Helper text: "Ethereum address of the student..."
   - Required, must start with "0x"

**Submit Button:**
- Full width, green background
- Text: "Reward Student" dengan coin icon
- Loading state: Spinner + "Rewarding Student..."

**Feedback:**
- Success: "Successfully rewarded student 0x1234... for activity #X"
- Error: Red box dengan error message

#### D. Mint Certificate Component
- **Card Style:** White bg, shadow-md
- **Icon:** Purple circle dengan document/download icon
- **Title:** "Mint Certificate"
- **Description:** "Issue NFT certificates to students who completed..."

**Form Fields:**
1. **Activity ID:**
   - Similar ke Reward Student
   - Real-time activity info fetch
   - Purple color scheme

2. **Student Wallet Address:**
   - Same as Reward Student
   - Purple focus ring

3. **Token URI (Metadata):**
   - Label: "Token URI (Metadata)"
   - Input: Text, monospace, placeholder "ipfs://... or https://..."
   - Helper text: "IPFS URI or URL pointing to certificate metadata JSON"
   - Required field

**Submit Button:**
- Full width, purple background
- Text: "Mint Certificate" dengan document icon
- Loading state: Spinner + "Minting Certificate..."

**Feedback:**
- Success: "Successfully minted certificate for 0x1234... (Activity #X)"
- Error: Red box dengan error message

---

## 🔧 Fungsi & Interaksi Blockchain

### Web3 Integration

**MetaMask Connection:**
- Detect jika MetaMask installed
- Request account access
- Listen untuk account changes
- Listen untuk network changes

**Network Management:**
- Detect current chain ID
- Auto-suggest switch ke Sepolia (11155111)
- Function: `switchToSepolia()` - trigger MetaMask network switch

**Smart Contract Interactions:**

1. **CampusPoint (ERC20):**
   - `balanceOf(address)` - Get token balance
   - `name()` - Get token name
   - `symbol()` - Get token symbol
   - Display balance with proper decimals (18)

2. **ActivityCertificate (ERC721):**
   - `ownerOf(tokenId)` - Get NFT owner
   - `tokenURI(tokenId)` - Get metadata URI
   - Display certificate details

3. **ActivityManager:**
   - **Admin Functions:**
     - `createActivity(name, points)` - Buat activity baru
     - `rewardStudent(activityId, studentAddress)` - Berikan poin
     - `mintCertificate(activityId, studentAddress, uri)` - Mint sertifikat
     - `getActivity(activityId)` - Get activity details
     - `owner()` - Get contract owner
   - **Student Functions:**
     - View activities
     - View rewards received

---

## 🎯 User Flows

### Student Flow:
1. Buka aplikasi → Redirect ke `/login`
2. Connect MetaMask → Approve connection
3. Switch ke Sepolia (jika perlu)
4. Auto redirect ke dashboard `/`
5. Lihat saldo poin (auto refresh)
6. Input Token ID untuk lihat sertifikat
7. Lihat detail sertifikat (owner, metadata)

### Admin Flow:
1. Login dengan wallet admin
2. Lihat button "Admin Dashboard" di main page
3. Navigate ke `/admin`
4. Create new activity (nama + poin reward)
5. Reward student dengan activity ID + address
6. Mint certificate dengan activity ID + address + metadata URI
7. Success message untuk setiap action
8. Switch ke Student View untuk preview

---

## 📐 Responsive Design

### Breakpoints:
- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl)

### Layout Adjustments:
- **Mobile:**
  - Stack columns vertically
  - Full width buttons
  - Smaller text sizes
  - Collapsible sections

- **Tablet:**
  - 2 column grid untuk cards
  - Medium spacing

- **Desktop:**
  - 3 column grid untuk info sections
  - Max width container (max-w-7xl)
  - Larger spacing dan padding

---

## ⚡ Loading & Error States

### Loading States:
- **Spinner Animation:** Rotating circle dengan opacity gradient
- **Text:** "Loading...", "Connecting...", "Refreshing...", etc.
- **Disabled Buttons:** Gray background, no pointer events

### Error States:
- **Red Background:** bg-red-50
- **Border:** border-red-200
- **Icon:** Red X or alert icon
- **Message:** Error text dari blockchain atau form validation
- **Hint:** Suggestion untuk fix (e.g., "Check contract address in config")

### Success States:
- **Green Background:** bg-green-50
- **Border:** border-green-200
- **Icon:** Green checkmark
- **Message:** Success confirmation
- **Auto-dismiss:** 5 seconds timeout

### Empty States:
- **Gray Icons:** Large, centered
- **Helper Text:** "No data found", "Enter ID to view", etc.
- **Actionable:** CTA untuk mulai (e.g., "Connect wallet first")

---

## 🎨 Component Styling Patterns

### Buttons:
```
Primary: bg-blue-600 hover:bg-blue-700
Success: bg-green-600 hover:bg-green-700
Purple: bg-purple-600 hover:bg-purple-700
Disabled: bg-{color}-300 cursor-not-allowed
Gradient: bg-gradient-to-r from-{color1} to-{color2}
```

### Cards:
```
Background: bg-white
Shadow: shadow-md
Rounded: rounded-lg
Padding: p-6
Margin: mb-6
```

### Inputs:
```
Border: border border-gray-300
Focus: focus:ring-2 focus:ring-{color}-500
Rounded: rounded-lg
Padding: px-4 py-2
Full Width: w-full
```

### Badges/Tags:
```
Background: bg-{color}-50
Border: border border-{color}-200
Rounded: rounded-lg
Padding: p-3 or p-4
```

---

## 🔐 Security & Protected Routes

**ProtectedRoute Component:**
- Wrap semua halaman kecuali `/login`
- Check jika wallet connected
- Check jika di correct network
- Redirect ke `/login` jika tidak authenticated

**Admin Protection:**
- Check `isOwner()` dari ActivityManager contract
- Conditional rendering untuk admin button
- Access control di `/admin` page
- Redirect non-admin ke dashboard

---

## 🌟 Key Features untuk AI Development

Saat membangun UI yang lebih baik, fokus pada:

1. **Visual Hierarchy:**
   - Clear headings dan sections
   - Proper spacing dan alignment
   - Consistent color coding (blue=student, purple=admin)

2. **User Feedback:**
   - Loading spinners untuk semua async actions
   - Success/Error messages yang jelas
   - Tooltips dan helper text

3. **Accessibility:**
   - Proper labels untuk inputs
   - ARIA attributes
   - Keyboard navigation support
   - High contrast untuk readability

4. **Animations:**
   - Subtle hover effects
   - Smooth transitions (duration-200, duration-300)
   - Pulsing animations untuk status indicators
   - Scale transforms pada hover (hover:scale-105)

5. **Data Display:**
   - Formatted addresses (shortened)
   - Proper number formatting (decimals)
   - Monospace untuk blockchain data
   - Clickable links untuk external URIs

6. **Mobile Experience:**
   - Touch-friendly button sizes
   - Responsive grid layouts
   - Readable text sizes
   - Easy-to-tap interactive elements

7. **Error Prevention:**
   - Form validation
   - Input type constraints (min, max, pattern)
   - Disabled states untuk invalid forms
   - Helpful placeholder text

---

## 📊 Current Limitations & Improvement Ideas

**Current:**
- Basic card-based layout
- Limited animations
- Simple success/error messaging
- Manual refresh untuk balance

**Potential Enhancements:**
- Real-time balance updates (polling atau events)
- Activity history/timeline view
- List semua user's NFTs
- Certificate preview/rendering
- QR code untuk verification
- Upload sistem untuk metadata ke IPFS
- Dark mode support
- Advanced filtering dan sorting
- Transaction history
- Gas fee estimation
- Multi-language support
- Profile customization
- Achievement badges system
- Leaderboard untuk top students

---

## 🎯 Design Goals untuk UI Rebuild

Ketika AI membangun UI baru, prioritas:

1. ✨ **Modern & Premium Look:** Gunakan shadows, gradients, dan smooth animations
2. 🎨 **Consistent Design System:** Define colors, spacing, typography di awal
3. 📱 **Mobile-First:** Design untuk mobile dulu, scale up ke desktop
4. ⚡ **Performance:** Lazy loading, code splitting, optimized images
5. 🎭 **Micro-interactions:** Hover, focus, active states yang smooth
6. 🧩 **Component Reusability:** Build reusable components (Button, Card, Input, Badge)
7. 🔍 **Clear Information Architecture:** Easy navigation, logical grouping
8. 🎪 **Engaging Visuals:** Icons, illustrations, atau custom graphics
9. 🛡️ **Trust & Security:** Clear indicators untuk blockchain transactions
10. 📈 **Scalability:** Design yang bisa grow dengan fitur baru

---

**End of UI Description Document**

> Dokumen ini memberikan blueprint lengkap untuk membangun interface yang modern, user-friendly, dan blockchain-ready. Gunakan sebagai referensi untuk development dengan AI atau tim developer.
