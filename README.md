# Quality Appliance Ecommerce Website V 2.0.0

A modern e-commerce platform built for selling quality appliances.

## Features

- Responsive design optimized for all devices
- Modern UI with TailwindCSS
- Fast and efficient performance
- SEO-friendly structure

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (V23.11.0)
- npm (V10.9.0)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quality-appliance.github.io.git
cd quality-appliance.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

## Project Structure

```
quality-appliance.github.io/
├── dist/          # Generated output by build tools (TailwindCSS and PostCSS)
├── public/        # Static assets (images, fonts, etc.)
├── src/           # Source files
│   └── styles/    # Processed TailwindCSS by PostCSS (main.css)
└── index.html     # Entry point of the website
```

## Development

To start the development server:

```bash
npm run dev
```