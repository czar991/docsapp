import Navbar from './_components/Navbar';
import Footer from './_components/footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1 pt-20'>{children}</main>
      <Footer />
    </div>
  );
}
