/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                byd: {
                    red: "#e60012", // rojo corporativo BYD
                    dark: "#262729", // gris oscuro header/footer
                    light: "#f5f5f5", // gris claro background
                    gray: "#4b5563", // texto
                    white: "#ffffff",
                    accent: "#ec4899", // rosa de apoyo
                    cyan: "#0891b2", // cian de apoyo
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
                serif: ["Playfair Display", "serif"],
            },
            fontSize: {
                h1: ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }], // 36px
                h2: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }], // 30px
                h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }], // 24px
                body: ["1rem", { lineHeight: "1.5rem" }], // 16px
                small: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
            },
            borderRadius: {
                sm: "0.25rem",
                md: "0.5rem",
                lg: "0.75rem",
                xl: "1rem",
                full: "9999px",
            },
            boxShadow: {
                byd: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "byd-lg": "0 10px 15px rgba(0, 0, 0, 0.15)",
            },
        },
    },
    plugins: [],
};
