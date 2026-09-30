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

## Formulário

O formulário preserva os campos atuais, valida os dados no navegador, aplica máscara de WhatsApp e prepara a mensagem para o número comercial existente. A pessoa conclui o envio dentro do WhatsApp; nenhum lead é enviado para um backend novo.
