/**
 * The ThemeSwap component is a dropdown menu that allows the user to select a theme.
 * @param root The root element of the application
 * @param root.theme The current theme
 * @param root.handleOnClick The function that is called when the user selects a theme.
 * @returns A dropdown menu that allows the user to select a theme.
 */
export default function ThemeSwap({
  handleOnClick,
  theme,
}: Readonly<{
  handleOnClick?: (e?: any) => void;
  theme: string;
}>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOnClick && handleOnClick(e.target.value);
  };
  const themes = [
    "HMR",
    "aqua",
    "autumn",
    "business",
    "coffee",
    "corporate",
    "cmyk",
    "cupcake",
    "cyberpunk",
    "dark",
    "dracula",
    "fantasy",
    "forest",
    "garden",
    "halloween",
    "lemonade",
    "luxury",
    "night",
    "retro",
    "synthwave",
    "valentine",
    "wireframe",
  ];

  return (
    <select
      className="select bg-base-200"
      onChange={handleChange}
      defaultValue={theme}
      aria-label="theme selection"
    >
      {themes.map((theme, index) => (
        <option className="bg-base-300" key={index} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}
