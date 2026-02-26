import { routing } from "@/i18n/routing";
import { inter } from "./fonts";

export default function RootNotFound() {
  const defaultLocale = routing.defaultLocale;

  return (
    <html lang={defaultLocale}>
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="mb-4 text-xl text-gray-600">
              {defaultLocale === "bg"
                ? "Страницата не е намерена"
                : "Page not found"}
            </p>
            <a href="/" className="text-blue-500 underline hover:text-blue-700">
              {defaultLocale === "bg"
                ? "Обратно към началото"
                : "Return to home"}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
