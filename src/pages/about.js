import Image from 'next/image';

export default function About() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/aboutback.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Soft overlay to improve contrast over the photo */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content card */}
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 py-16">
        <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            style={{ color: '#C4A24A' }} // soft gold
          >
            About Us
          </h1>

          <div className="text-gray-900 text-lg space-y-4 text-center md:text-left">
            <p>
              Welcome to <strong>Golden Nails</strong> — a proud, local, family-owned nail salon
              serving the Golden Valley community since 2008!
            </p>

            <p>
              Our mission is simple: to make every guest feel relaxed, pampered, and beautiful. We
              believe in the power of quality work, friendly service, and a warm, welcoming
              atmosphere where you can truly unwind.
            </p>

            <p>
              As a tight-knit team, we treat our clients like family. Whether you’re coming in for a
              quick touch-up or treating yourself to a full-service spa day, we’re here to make your
              experience special.
            </p>

            <p className="mb-6">
              Thank you for supporting small businesses like ours. We can't wait to welcome you in!
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Image
              src="/images/staff.jpg"
              alt="Golden Nails Staff"
              width={1000}
              height={650}
              priority
              className="rounded-2xl shadow-lg object-cover w-full max-w-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
