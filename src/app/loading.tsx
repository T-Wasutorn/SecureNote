export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FFE2C7] z-9999">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
        
        {/* Spinning Ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-[#F28500] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-4 text-[#F28500] font-medium tracking-widest animate-pulse">
        SecureNote
      </p>
    </div>
  );
}