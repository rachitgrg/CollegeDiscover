import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/colleges" className="flex items-center gap-2 text-blue-600 font-bold">
            <GraduationCap className="h-6 w-6" />
            CollegeDiscover
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/colleges" className="hover:text-gray-900 transition-colors">Colleges</Link>
            <Link href="/compare" className="hover:text-gray-900 transition-colors">Compare</Link>
            <Link href="/saved" className="hover:text-gray-900 transition-colors">Saved</Link>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CollegeDiscover. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
