import { ThemeProvider } from '@/components/ThemeProvider';
import { Loader } from '@/components/Loader';
import { PublicSite } from '@/components/PublicSite';
import { Admin } from '@/components/admin/Admin';
import { useRouter } from '@/hooks/useRouter';

function App() {
  const { path } = useRouter();
  const isAdmin = path.startsWith('/admin');

  return (
    <ThemeProvider>
      <Loader />
      {isAdmin ? <Admin /> : <PublicSite />}
    </ThemeProvider>
  );
}

export default App;
