import ToolCard from "@/components/ToolCard"; import AdSlot from "@/components/AdSlot";
export default function Home(){return <div><section className="max-w-6xl mx-auto px-4 pt-20 pb-12 text-center"><span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300">FAST • SIMPLE • PRIVATE</span><h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight">Your files. Your tools.<br/><span className="text-cyan-400">One simple place.</span></h1><p className="max-w-2xl mx-auto mt-6 text-slate-400 text-lg">Convert and compress media directly in your browser-to-server workflow. No account required for the MVP.</p><AdSlot/></section><section className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-10"><ToolCard href="/video-downloader" icon="video" title="Video Converter" desc="Convert uploaded videos to MP4, WEBM or MOV."/>
<ToolCard
  href="/video-url-downloader"
  icon="video-download"
  title="Video Downloader"
  desc="Download supported videos by pasting a video URL."
/><ToolCard href="/audio-converter" icon="audio" title="Audio Converter" desc="Extract or convert audio from your own media files."/><ToolCard href="/image-converter" icon="image" title="Image Converter" desc="Convert JPG, PNG and WEBP images."/><ToolCard href="/compress-video" icon="compress" title="Video Compressor" desc="Reduce video size with FFmpeg." /></section><section className="max-w-6xl mx-auto px-4 pb-12">
<h2 className="text-2xl font-bold text-center">Popular Video Downloaders</h2>
<p className="mt-3 text-slate-400 text-center">Download supported videos from popular platforms using MediaSave.</p>
<div className="mt-6 grid sm:grid-cols-3 gap-4">
<a href="/tiktok-video-downloader" className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-cyan-400/40 transition">
<h3 className="font-bold">TikTok Video Downloader</h3>
<p className="mt-2 text-sm text-slate-400">Download supported TikTok videos by URL.</p>
</a>
<a href="/instagram-video-downloader" className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-cyan-400/40 transition">
<h3 className="font-bold">Instagram Video Downloader</h3>
<p className="mt-2 text-sm text-slate-400">Download supported Instagram videos and Reels.</p>
</a>
<a href="/youtube-video-downloader" className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-cyan-400/40 transition">
<h3 className="font-bold">YouTube Video Downloader</h3>
<p className="mt-2 text-sm text-slate-400">Download supported YouTube videos by URL.</p>
</a>
</div>
</section>
<section className="max-w-4xl mx-auto px-4 pb-20 text-center"><h2 className="text-2xl font-bold">Launch free, upgrade later</h2><p className="mt-3 text-slate-400">Start with the free Vercel deployment for your website, SEO and content. Add dedicated media processing when traffic grows.</p></section></div>}