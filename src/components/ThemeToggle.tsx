import { useUniversalStorage } from '@/hooks/useUniversalStorage';

export const ThemeToggle = () => {
  const [theme, setTheme] = useUniversalStorage<'light'|'dark'>('theme', 'dark');
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};