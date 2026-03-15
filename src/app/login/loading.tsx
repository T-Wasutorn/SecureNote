export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-8"></div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-100 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-100 rounded"></div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    </div>
  )
}