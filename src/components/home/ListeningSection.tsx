import listeningData from "../../../content/listening.json";

function getTrackId(spotifyUrl: string): string | null {
  const match = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export default function ListeningSection() {
  const trackId = getTrackId(listeningData.spotifyUrl);
  if (!trackId) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-editorial-rule">
      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-editorial-gray mb-6">
        Vad jag lyssnar på just nu
      </p>
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "4px" }}
      />
    </section>
  );
}
