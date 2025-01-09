import Head from 'next/head';
import Calendar from '../components/Calendar';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Reservation App</title>
        <meta name="description" content="Make reservations easily" />
      </Head>

      <header className="bg-blue-500 p-4 text-white">
        <nav className="flex justify-between">
          <div className="logo">Reservation App</div>
          <div className="links">
            <a href="#about" className="px-2">About</a>
            <a href="#contact" className="px-2">Contact</a>
          </div>
        </nav>
      </header>

      <main className="p-8">
        <section className="landing-page">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Reservation App</h1>
          <p className="mb-8">Book your slots easily and efficiently.</p>
          <Calendar />
        </section>
      </main>

      <footer className="bg-blue-500 p-4 text-white text-center">
        &copy; 2023 Reservation App
      </footer>
    </div>
  );
};

export default Home; 