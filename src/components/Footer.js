import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white text-center py-6 mt-12">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Golden Nails Golden Valley. All rights reserved.
      </p>
      <p className="text-xs mt-1">
        Website built and maintained with 💅 by your web dev
      </p>
    </footer>
  );
}
