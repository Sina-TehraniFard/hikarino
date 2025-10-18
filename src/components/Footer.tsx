import packageJson from "../../package.json";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const displayYear = currentYear > 2025 ? `2025 - ${currentYear}` : "2025";

  return (
    <footer className="w-full py-4 border-t border-gray-200">
      <div className="max-w-md mx-auto text-center text-gray-500 text-sm space-y-2">
        <div>
          © {displayYear} ヒカリノ v{packageJson.version} by{" "}
          <a
            href="https://scriptlab.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            スクリプトラボ
          </a>
        </div>
        <div className="space-x-4">
          <Link href="/terms" className="text-purple-600 hover:underline">
            利用規約
          </Link>
        </div>
      </div>
    </footer>
  );
}
