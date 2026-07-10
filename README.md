# 🎙️ Dub Low Cost

> **Desenvolvido por Robert Luiz**
> **Curso:** Ciência da Computação — Universidade Federal de Mato Grosso (UFMT)
> **Período:** 2026/1 (1º semestre)
> **Disciplina:** Fundamentos da Computação

Uma aplicação de **dublagem automática de vídeos utilizando Inteligência Artificial**, desenvolvida com foco em **baixo custo computacional**, **rapidez** e **boa qualidade de áudio**.

O usuário envia um vídeo (de até **3 minutos**) em inglês e a aplicação realiza automaticamente todo o processo de transcrição, tradução, geração da voz em português e sincronização do novo áudio com o vídeo original, entregando ao final um vídeo completamente dublado.

---

## ✨ Funcionalidades

* Upload de vídeos de até 3 minutos
* Extração automática da faixa de áudio
* Transcrição utilizando Whisper
* Tradução automática para português
* Geração da dublagem utilizando IA
* Inserção do novo áudio no vídeo
* Download do vídeo dublado

---

## 🚀 Fluxo da aplicação

```text
Vídeo
   │
   ▼
Extração do áudio (FFmpeg)
   │
   ▼
Transcrição (faster-whisper)
   │
   ▼
Tradução (deep-translator)
   │
   ▼
Geração da voz (edge-tts)
   │
   ▼
Junção do novo áudio ao vídeo
   │
   ▼
Vídeo dublado
```

---

## 🏗️ Arquitetura

### 1. Extração de áudio

A primeira etapa consiste em extrair a faixa de áudio do vídeo utilizando o **FFmpeg**, uma das principais ferramentas de código aberto para processamento de áudio e vídeo.

Essa etapa é rápida, eficiente e possui baixo custo computacional, preparando o áudio para as próximas fases da aplicação.

---

### 2. Transcrição

A transcrição é realizada utilizando o **Whisper**, modelo de reconhecimento automático de fala desenvolvido pela OpenAI.

Para reduzir o custo computacional, a aplicação utiliza a biblioteca **faster-whisper**, que executa o modelo Whisper por meio do mecanismo de inferência **CTranslate2**, substituindo o PyTorch utilizado pela implementação original.

Essa abordagem proporciona:

* Menor consumo de memória RAM e VRAM;
* Processamento significativamente mais rápido;
* Mesma qualidade de transcrição da implementação oficial.

Ao término dessa etapa é gerado um JSON contendo:

* Texto original em inglês;
* Texto traduzido para português;
* Instante de início de cada fala;
* Instante de término de cada fala.

---

### 3. Tradução

A tradução é realizada utilizando a biblioteca **deep-translator**, que utiliza o serviço do **Google Tradutor**.

Cada trecho é traduzido logo após sua transcrição e armazenado diretamente no JSON utilizado durante todo o restante do processamento.

Essa solução foi escolhida por apresentar um custo computacional extremamente baixo quando comparada à execução local de modelos de tradução como:

* MarianMT
* Argos Translate
* NLLB

---

### 4. Dublagem

Após a tradução, cada trecho é convertido em áudio utilizando o **edge-tts**, que utiliza as vozes neurais disponibilizadas pela Microsoft.

Essa abordagem oferece excelente qualidade de voz sem exigir processamento pesado no servidor.

Outras alternativas consideradas durante o desenvolvimento foram:

* Piper (offline)
* gTTS
* pyttsx3

Entretanto, o **edge-tts** apresentou o melhor equilíbrio entre qualidade da voz, velocidade de processamento e baixo custo computacional.

---

### 5. Geração do vídeo

Na etapa final, todos os trechos de áudio sintetizados são unidos em uma única faixa sonora.

Essa nova faixa substitui o áudio original do vídeo, gerando o vídeo dublado que será disponibilizado ao usuário.

---

## 🛠️ Tecnologias Utilizadas

### Backend

* Python
* FastAPI

### Frontend

* Next.js

### Inteligência Artificial

* Whisper
* faster-whisper
* edge-tts

### Tradução

* deep-translator

### Processamento de mídia

* FFmpeg

### Infraestrutura

* Docker
* Vercel (Frontend)
* Servidor Linux (Backend)

---

## 🎯 Objetivo

O objetivo deste projeto é demonstrar que é possível desenvolver uma aplicação de dublagem automática utilizando Inteligência Artificial sem depender de infraestrutura de alto desempenho.

Toda a arquitetura foi projetada priorizando:

* Baixo custo computacional;
* Rapidez no processamento;
* Boa qualidade da dublagem;
* Facilidade de implantação.

Dessa forma, a aplicação pode ser executada em servidores com recursos limitados sem comprometer significativamente a qualidade do resultado final.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e de pesquisa.
