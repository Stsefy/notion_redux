const defaultStyle = 'w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:border-blue-500';

const Input = ({ label, type, value, handler, textarea = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {
        textarea
          ? <textarea value={value} onInput={handler} className={`${defaultStyle} min-h-10 max-h-48`} />
          : <input type={type} value={value} onInput={handler} className={defaultStyle} />
      }
    </div>
  )
};

export default Input;