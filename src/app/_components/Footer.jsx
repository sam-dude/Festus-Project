// src/components/Footer.js
"use client";

const Footer = () => {
  return (
    <section className="px-8">
      <footer
        className="bg-gray-50 text-gray-700 py-4 px-8 fixed bottom-0 mb-4 rounded-2xl border border-gray-200 shadow-sm"
        style={{ width: 'calc(100% - 64px)' }}
      >
        <div className="container mx-auto text-center">
          <p>&copy; Smart home dashboard</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
