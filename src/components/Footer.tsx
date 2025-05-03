export default function Footer() {
    return (
        <footer className="w-full py-4 bg-white border-t border-gray-200">
            <div className="max-w-md mx-auto text-center">
                <p className="text-gray-600 text-sm">
                    © 2025-{new Date().getFullYear()} TehraniFard Sina
                </p>
            </div>
        </footer>
    );
} 