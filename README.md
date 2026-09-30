# Rafaela Almeida — Landing page premium

Landing page responsiva para BPO Financeiro e Gestão Estratégica.

## Stack

- React 19 + TypeScript
- TanStack Start / TanStack Router
- Vite
- Tailwind CSS v4
- Radix UI (Accordion) com padrão shadcn/ui
- Lucide React

## Desenvolvimento

```bash
npm install
npm run dev
```

A prévia local fica em `http://127.0.0.1:3000/`.

## Verificações

```bash
npm run typecheck
npm run build
npm run build:site
```

`build:site` gera a versão com base `/rafaela-silva-consultoria4/`. Os arquivos estáticos ficam em `dist/client/` para publicação no mesmo caminho do site atual.

## Vercel

O projeto usa a integração oficial Nitro + TanStack Start. Na Vercel, importe o repositório com a raiz na pasta do projeto e mantenha o framework detectado como `TanStack Start`. O arquivo `vercel.json` já declara essa configuração; o comando padrão de build é `npm run build`.

## Formulário

O formulário preserva os campos atuais, valida os dados no navegador, aplica máscara de WhatsApp e prepara a mensagem para o número comercial existente. A pessoa conclui o envio dentro do WhatsApp; nenhum lead é enviado para um backend novo.
