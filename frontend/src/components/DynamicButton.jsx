function DynamicButton({ text, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      {text}
    </button>
  );
}

export default DynamicButton;