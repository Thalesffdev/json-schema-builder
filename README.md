# JSON Schema Builder

Aplicação web para construção dinâmica de objetos JSON diretamente no navegador. O usuário define campos com nome, valor e tipo de dado, e a aplicação gera um JSON válido, tipado e pronto para uso.

![JSON Schema Builder](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)

---

## Sobre o projeto

O JSON Schema Builder nasceu de uma necessidade real no desenvolvimento de software: construir payloads JSON rapidamente para testes de API, prototipação de entidades e documentação de estruturas de dados, sem precisar escrever o JSON manualmente.

A aplicação opera 100% no client-side. Nenhum dado é enviado para servidor.

---

## Funcionalidades

- Adição e remoção dinâmica de campos
- Suporte aos tipos primitivos: `string`, `number`, `boolean` e `null`
- Coerção automática de tipo no momento da geração
- Validação com feedback inline por campo (nome vazio, duplicado, valor incompatível)
- Visualização do JSON gerado com formatação e syntax highlighting
- Cópia do JSON para a área de transferência com feedback visual
- Download do resultado como arquivo `.json`
- Layout responsivo (desktop e mobile)

---

## Stack

| Tecnologia | Uso |
|---|---|
| Next.js 15 | Ambiente de execução (SPA client-side) |
| React 19 | Interface e gerenciamento de estado |
| TypeScript | Tipagem estrita em toda a aplicação |
| Tailwind CSS | Estilização utilitária |

> Next.js é usado apenas como ambiente — nenhum recurso de SSR, SSG, Server Components ou API Routes é utilizado.

---

## Arquitetura

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx          # Composição da aplicação
├── components/
│   ├── FieldRow.tsx       # Linha individual de campo
│   ├── FieldList.tsx      # Lista de campos
│   ├── JsonOutput.tsx     # Bloco de output com copiar e download
│   └── ActionBar.tsx      # Botões de ação
├── hooks/
│   └── useFieldBuilder.ts # Estado e lógica central
├── types/
│   └── field.ts           # Tipos TypeScript do projeto
└── utils/
    └── buildJson.ts       # Função pura de conversão
```

---

## Decisões técnicas

**Hook customizado (`useFieldBuilder`)**
Toda a lógica de estado foi centralizada em um hook customizado, mantendo os componentes responsáveis apenas pela apresentação. Isso facilita testes, manutenção e eventual migração de UI.

**Função pura (`buildJson`)**
A conversão dos campos para objeto JSON foi isolada em uma função pura sem dependências de React. Dado o mesmo input, o output é sempre o mesmo — previsível e fácil de testar.

**Tipagem sem `any`**
Nenhum uso de `any` em toda a base de código. Os tipos `FieldType`, `Field` e `JsonBuilderState` cobrem todos os estados possíveis da aplicação.

**Coerção de tipo explícita**
O valor inserido pelo usuário é sempre tratado como `string` internamente. A conversão para `number`, `boolean` ou `null` acontece apenas no momento da geração — evitando comportamentos inesperados durante a edição.

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/Thalesffdev/json-schema-builder.git

# Acesse a pasta
cd json-schema-builder

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

---

## 🚀 Deploy

A aplicação está disponível online:

🔗 https://json-schema-builder-nu-khaki.vercel.app/

O deploy é realizado automaticamente a cada novo push na branch principal do repositório, utilizando integração contínua (CI/CD).


## Como usar

1. Clique em **+ Adicionar campo** para criar um novo campo
2. Preencha o **nome** da chave, o **valor** e selecione o **tipo de dado**
3. Repita para quantos campos desejar
4. Clique em **Gerar JSON**
5. Copie o resultado ou faça o **Download .json**

---

## Autor

**Thales Fernandes de Faria**  
Front-End Developer · Estudante de Engenharia de Software

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Thales_Fernandes-0077b5?style=flat-square&logo=linkedin)](https://linkedin.com/in/thalesff)
[![Portfolio](https://img.shields.io/badge/Portfolio-thalesff.com.br-00FF94?style=flat-square)](https://thalesff.com.br)
[![GitHub](https://img.shields.io/badge/GitHub-Thalesffdev-181717?style=flat-square&logo=github)](https://github.com/Thalesffdev)
