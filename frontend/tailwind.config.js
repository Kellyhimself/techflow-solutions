// Tailwind CSS v4 configuration
// The main configuration is now done in CSS using @theme directive
// This file is kept for any additional configuration if needed

export default {
  // Content paths are now handled automatically in v4
  // but we can still specify them if needed
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
}; 