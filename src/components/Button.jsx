import { useMemo } from "react";

const defaultStyle = 'font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline';

const Button = ({ children, handler, customColor = 'blue', full = false }) => {
  const styles = useMemo(() => {
    const all = [];
    const getCustomStyle = (color) => {
      switch (color) {
        case 'green':
          return 'bg-green-500 hover:bg-green-700 text-white';
        case 'blue':
          return 'bg-blue-500 hover:bg-blue-700 text-white';
        case 'red':
          return 'bg-red-500 hover:bg-red-700 text-white';
        case 'white':
          return 'bg-white hover:bg-slate-200 text-blue';
        default:
          return 'bg-gray-500 hover:bg-gray-700 text-white';
      }
    };

    all.push(defaultStyle);
    all.push(getCustomStyle(customColor));
    all.push(full ? 'w-full' : '');

    return all.join(' ');
  }, [customColor, full]);

  return (
    <button onClick={handler} className={styles}>
      {children}
    </button>
  )
};

export default Button;