import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-gray-800 text-center">
      <h1 className="text-4xl font-bold mb-6 text-gold-700">About Us</h1>
      
      <p className="mb-4 text-lg">
        Welcome to <strong>Golden Nails</strong> — a proud, local, family-owned nail salon serving the Golden Valley community since 2008!
      </p>

      <p className="mb-4 text-lg">
        Our mission is simple: to make every guest feel relaxed, pampered, and beautiful. We believe in the power of quality work, friendly service, and a warm, welcoming atmosphere where you can truly unwind.
      </p>

      <p className="mb-4 text-lg">
        As a tight-knit team, we treat our clients like family. Whether you’re coming in for a quick touch-up or treating yourself to a full-service spa day, we’re here to make your experience special.
      </p>

      <p className="text-lg mb-10">
        Thank you for supporting small businesses like ours. We can't wait to welcome you in!
      </p>

      <div className="flex justify-center">
        <Image
          src="/images/staff.jpg"
          alt="Golden Nails Staff"
          width={800}
          height={500}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  );
}
