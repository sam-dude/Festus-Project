// src/components/Footer.js
"use client";

const Footer = () => {
  return (
    <section className="px-8">
      <footer
        className="bg-gray-50 text-gray-700 py-4 px-8 fixed bottom-0 mb-4 rounded-xl"
        style={{ width: 'calc(100% - 64px)' }}
      >
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Festus Charles. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
