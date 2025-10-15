import { FileText } from "lucide-react"

export const AppLogo = () => {
    return (
        <div className="px-6 py-4 border-r border-gray-400 flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-900 flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 font-facultyGlyphic">
                InvoiceeAI
                </h1>
                <p className="text-sm text-gray-500">Smart Invoicing</p>
            </div>
        </div>
    )
}