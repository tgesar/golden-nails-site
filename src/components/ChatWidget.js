import { useEffect, useRef, useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I’m the Golden Nails assistant. Ask me about hours, services, prices, or how to book." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (data?.reply) {
        setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...nextMessages, { role: 'assistant', content: "Sorry—I couldn’t get an answer right now." }]);
      }
    } catch (err) {
      setMessages([...nextMessages, { role: 'assistant', content: "Error contacting the assistant. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg px-4 py-3 bg-black text-white hover:opacity-90 transition"
        aria-label="Open chat"
      >
        {open ? 'Close Chat' : 'Chat'}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[90vw] max-w-sm bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-black text-white px-4 py-3 text-sm font-semibold">
            Golden Nails Assistant
          </div>

          <div className="p-3 h-80 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-md text-sm leading-relaxed ${
                  m.role === 'assistant'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-[#fff0d9] text-gray-800 ml-auto'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-500">Assistant is typing…</div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={sendMessage} className="border-t border-gray-200 p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, hours, booking…"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white text-sm px-3 py-2 rounded-md disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
