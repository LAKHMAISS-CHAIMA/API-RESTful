function Home() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-2xl bottom-10 right-10 animate-spin-slow" />
      <div className="z-10 p-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl text-center max-w-md">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide drop-shadow-md">
          Bonjour utilisateur !
        </h1>
      </div>
    </div>
  );
}

export default Home;
