import { FileText } from "lucide-react"
import Link from "next/link"

export const AppLogo = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gray-900 flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
                <Link href="/" className="text-3xl font-bold text-gray-900 font-facultyGlyphic">
                    InvoiceeAI
                </Link>
                <p className="text-sm text-gray-500">Smart Invoicing</p>
            </div>
        </div>
    )
}