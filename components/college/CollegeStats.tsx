import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react'
import { College } from '@/types'
import { formatFees, formatPackage } from '@/lib/utils'

interface CollegeStatsProps {
  college: College
}

export function CollegeStats({ college }: CollegeStatsProps) {
  const stats = [
    {
      icon: DollarSign,
      label: 'Annual Fees',
      value: formatFees(college.annualFees),
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      label: 'Avg Package',
      value: college.avgPackage ? formatPackage(college.avgPackage) : 'N/A',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: Users,
      label: 'Placement Rate',
      value: college.placementRate ? `${college.placementRate}%` : 'N/A',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      icon: Calendar,
      label: 'Established',
      value: college.establishedYear.toString(),
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, label, value, color, bg }) => (
        <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className={`inline-flex p-2.5 rounded-lg ${bg} mb-3`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className={`text-lg font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}
