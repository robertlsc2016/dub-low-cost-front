"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [video, setVideo] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "uploading" | "processing" | "success" | "error"
  >("idle");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("video/")) {
      alert("Selecione um vídeo válido");
      return;
    }

    setVideo(file);
    setStatus("idle");
    setResult(null);
    setError(null);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  async function handleUpload() {
    if (!video) {
      alert("Selecione um vídeo primeiro");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setStatus("uploading");

      const formData = new FormData();
      formData.append("video", video);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar vídeo");
      }

      setStatus("processing");

      const data = await response.json();

      setResult(data);
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center px-6 py-12">
      <h2 className="text-green-400 font-bold text-xl mb-8">
        Dub Low Cost
      </h2>

      {/* HERO */}
      <section className="max-w-4xl text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Duble seu vídeo curto de forma
          <span className="text-green-400"> Fácil e Rápida </span>
          com IA
        </h1>

        <p className="mt-6 text-zinc-400 text-lg">
          Faça upload do seu vídeo e gere uma versão dublada com IA em poucos minutos.
        </p>
      </section>

      {/* UPLOAD */}
      <section className="w-full max-w-3xl">
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
            ${
              dragging
                ? "border-green-400 bg-green-500/10"
                : "border-zinc-700 bg-zinc-900/50"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-zinc-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0l-4 4m4-4l4 4M5 20h14"
            />
          </svg>

          {video ? (
            <>
              <h3 className="text-2xl font-semibold">{video.name}</h3>
              <p className="text-green-400 mt-2">
                {(video.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-2">
                Arraste seu vídeo aqui
              </h3>
              <p className="text-zinc-400">
                ou clique para selecionar um arquivo
              </p>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={!video || loading}
          className="w-full mt-8 bg-green-500 hover:bg-green-400 disabled:bg-zinc-700 disabled:text-zinc-400 text-black font-bold text-xl py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20"
        >
          {loading ? "Processando..." : "🚀 Iniciar Processamento"}
        </button>

        {/* STATUS */}
        {status === "uploading" && (
          <div className="mt-6 text-yellow-400 text-center">
            📤 Enviando vídeo...
          </div>
        )}

        {status === "processing" && (
          <div className="mt-6 text-blue-400 text-center animate-pulse">
            🤖 IA está processando seu vídeo... isso pode levar alguns minutos
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 text-red-400 text-center">
            ❌ Erro: {error}
          </div>
        )}

        {/* SUCCESS */}
        {status === "success" && result && (
          <div className="mt-8 p-6 bg-zinc-900 border border-green-500 rounded-2xl text-center">
            <h3 className="text-green-400 text-2xl font-bold mb-4">
              ✅ Processamento concluído!
            </h3>

            <video
              src={result.video}
              controls
              className="w-full rounded-xl mb-4"
            />

            <div className="flex gap-4 justify-center">
              <a
                href={result.video}
                target="_blank"
                className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
              >
                Abrir vídeo
              </a>

              <a
                href={result.video}
                download
                className="bg-zinc-700 px-6 py-3 rounded-xl font-bold"
              >
                Baixar
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}