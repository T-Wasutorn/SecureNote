export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* ส่วนหัวจำลอง */}
      <div className="mb-10 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-32 bg-gray-100 rounded"></div>
      </div>

      {/* Grid ของ Skeleton Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg p-6 h-40 bg-white shadow-sm flex flex-col gap-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse mt-auto"></div>
          </div>
        ))}
      </div>
    </div>
  )
}