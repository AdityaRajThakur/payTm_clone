export function Button({ label , onClick }) {
  return (
    <div className="grid grid-cols-1">
      <button
        type="button"
        onClick = {onClick} 
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-1 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        {label}
      </button>
    </div>
  );
}
