import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        hardblue: "#0D8EAA",
        hardgreen: "#25A038",
      },
    },
  },
  plugins: [],
} satisfies Config;
