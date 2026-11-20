# Formula 1 Official Web Experience (f1withindia)

A high-performance, pixel-accurate web experience inspired by [formula1.com](https://www.formula1.com/). Built with React 19, Vite, TypeScript, and Tailwind CSS.

## 🏁 Overview

- **Race Weekend Hub**: Real-time Grand Prix weekend ticker with active countdown, session indicators (`FP3 LIVE`), and TAG Heuer track time clocks.
- **Editorial & Hero News Grid**: Main featured headline story, 4-stacked top stories, and trending analysis cards.
- **Must Watch Carousel**: Interactive video carousel with category labels, play overlays, and duration timestamps.
- **2026 Season Championship Standings**: Official Drivers' and Constructors' standings with podium cards for Kimi Antonelli, Max Verstappen, and George Russell.
- **Championship Calendar**: Full 24 Grand Prix race schedule with track dates, circuits, and round classifications.
- **Driver & Constructor Grids**: Complete 2026 driver cards with numbers, nationality flags, and team profiles.
- **Live Timing Screen**: Real-time sector splits, speed trap telemetry, tyre compound stint ages, and pit stop data.
- **Under-the-Hood Data Structures Architecture**:
  - Screen Navigation History: **Stack ADT (LIFO)**
  - Telemetry Stream Ingestion: **Queue ADT (FIFO & Circular Buffer)**
  - Lap-by-Lap Event Chaining: **Linked List ADT**
  - Speed Trap Benchmarks: **Binary Search O(log n)**
  - Circuit Corner Route Network: **Graph ADT (BFS/DFS)**
  - Pit Telemetry Frequency Directory: **8-Slot Hash Table**

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
git clone https://github.com/TanmayNileshShinde/f1withindia.git
cd f1withindia
npm install
npm run dev
```

The application will start at `http://127.0.0.1:5174/` (or your assigned Vite port).

### Production Build

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 + Custom Racing Theme
- **Icons**: Lucide React
- **Typography**: Titillium Web & JetBrains Mono

---
Designed & developed by **Tanmay Nilesh Shinde**.
