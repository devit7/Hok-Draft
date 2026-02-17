# Hero List Components

Komponen-komponen reusable untuk menampilkan daftar hero dari Honor of Kings.

## Struktur Folder

```
components/hero-list/
├── index.ts                 # Barrel export
├── types.ts                 # Type definitions
├── hero-card.tsx            # Komponen card untuk hero
├── tool-tip-hero-card.tsx   # Komponen tooltip untuk detail hero
├── hero-filter.tsx          # Komponen filter dan search
└── README.md                # Dokumentasi
```

## Komponen

### HeroCard

Komponen untuk menampilkan card hero dengan gambar, nama, dan role badges.

**Props:**

- `heroName?: string` - Nama hero
- `heroImage?: string` - Path gambar hero (relatif ke `/asset/hero/`)
- `heroRole?: HeroRole[]` - Array role hero

**Contoh Penggunaan:**

```tsx
import { HeroCard } from "@/components/hero-list";

<HeroCard
  heroName="Haya"
  heroImage="001-Haya.jpg"
  heroRole={[
    { id: 3, role: "Mid Lane", icon: "/asset/role/mid-lane.png" },
    { id: 5, role: "Roamer", icon: "/asset/role/roamer.png" },
  ]}
/>;
```

### ToolTipHeroCard

Komponen wrapper yang menampilkan tooltip dengan detail hero saat hover.

**Props:**

- `children: React.ReactNode` - Komponen anak (biasanya HeroCard)
- `imageCover: string` - URL gambar cover hero untuk tooltip

**Contoh Penggunaan:**

```tsx
import { ToolTipHeroCard, HeroCard } from "@/components/hero-list";

<ToolTipHeroCard imageCover="https://example.com/hero-cover.jpg">
  <HeroCard heroName="Haya" heroImage="001-Haya.jpg" heroRole={roles} />
</ToolTipHeroCard>;
```

### HeroFilter

Komponen untuk filter role dan search hero.

**Props:**

- `listRole: HeroRole[]` - Array daftar role yang tersedia
- `onRoleSelect?: (roleId: number | null) => void` - Callback saat role dipilih
- `onSearch?: (query: string) => void` - Callback saat user mengetik di search

**Contoh Penggunaan:**

```tsx
import { HeroFilter } from "@/components/hero-list";

const handleRoleSelect = (roleId: number | null) => {
  console.log("Selected role:", roleId);
};

const handleSearch = (query: string) => {
  console.log("Search query:", query);
};

<HeroFilter
  listRole={listRole}
  onRoleSelect={handleRoleSelect}
  onSearch={handleSearch}
/>;
```

## Types

### HeroRole

```typescript
interface HeroRole {
  id: number;
  role: string;
  icon: string;
}
```

### HeroMedia

```typescript
interface HeroMedia {
  heroCover: string;
  heroIcon: string;
  heroBody: string;
}
```

### Hero

```typescript
interface Hero {
  showRate: number;
  heroCareer: string;
  banRate: number;
  heroName: string;
  winRate: number;
  media: HeroMedia;
  role: HeroRole[];
  heroExperience: string;
  heroId: number;
}
```

## Import

Semua komponen dan types bisa diimport dari satu sumber:

```typescript
import {
  HeroCard,
  HeroFilter,
  ToolTipHeroCard,
  type Hero,
  type HeroRole,
  type HeroMedia,
} from "@/components/hero-list";
```

## Pengembangan Lebih Lanjut

Komponen-komponen ini dirancang untuk bisa di-extend dengan fitur tambahan seperti:

1. **State Management** - Implementasi state untuk filtering dan search
2. **Lazy Loading** - Loading gambar secara lazy untuk performa
3. **Pagination** - Tambahkan pagination untuk daftar hero yang banyak
4. **Dynamic Tooltip Data** - Terima props data hero untuk tooltip yang dinamis
5. **Responsive Design** - Improve tampilan untuk berbagai ukuran layar
