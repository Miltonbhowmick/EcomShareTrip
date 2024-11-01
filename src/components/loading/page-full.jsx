export default function PageFullLoader() {
  return (
    <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </div>
  );
}
