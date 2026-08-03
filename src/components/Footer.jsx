function Footer() {
  return (
    <footer className="w-full border-t border-black/10 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/logo.webp"
            alt="Logo Restaurante O Tavira"
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-bold text-white">O Tavira - Staff</span>
        </a>


      </div>
    </footer>
  );
}

export default Footer;
