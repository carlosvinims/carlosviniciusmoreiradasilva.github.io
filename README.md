# Carlos Vinicius — Portfólio

Portfólio profissional estático desenvolvido para apresentação de Carlos Vinicius Moreira da Silva como estudante de Desenvolvimento de Sistemas e Desenvolvedor Web PHP Júnior em formação.

O projeto foi pensado para hospedagem através do GitHub Pages.

---

## Tecnologias utilizadas

- HTML5
- Tailwind CSS
- CSS3
- JavaScript moderno
- SVG

Não são utilizados:

- React
- Vue
- Angular
- Bootstrap
- PHP
- Banco de dados
- Backend
- Node.js para execução do site

---

## Estrutura

/ ├── index.html │ ├── assets/ │ ├── css/ │ │ └── style.css │ │ │ ├── js/ │ │ └── main.js │ │ │ └── images/ │ └── perfil.jpg │ └── README.md


---

## Foto de perfil

A página está preparada para utilizar a foto pessoal através do seguinte caminho:

assets/images/perfil.jpg


Basta colocar a imagem nesse local.

Caso a imagem não esteja presente, o portfólio exibe automaticamente um placeholder indicando o caminho esperado.

---

## Tailwind CSS

O projeto utiliza o Tailwind CSS através do CDN no `index.html`.

Isso permite que o site funcione como uma página estática sem processo de build.

O projeto não precisa executar:

npm install


ou:

npm run build


para funcionar no GitHub Pages.

### Observação

A abordagem via CDN foi escolhida para respeitar a exigência de um projeto estático sem estrutura de build.

Para uma futura versão otimizada para produção, o Tailwind pode ser compilado previamente e o CSS gerado pode ser versionado junto ao projeto.

---

## Funcionalidades

O portfólio possui:

- Navegação responsiva;
- Menu mobile;
- Navegação suave;
- Header com efeito durante o scroll;
- Animações de entrada;
- Respeito à preferência `prefers-reduced-motion`;
- Filtro de projetos;
- Cards de projetos;
- Links para GitHub;
- Link para LinkedIn;
- Link de contato por e-mail;
- Background tecnológico;
- Glassmorphism;
- Elementos visuais inspirados em terminal;
- Placeholder para foto;
- Favicon SVG;
- Meta tags básicas de SEO;
- Open Graph básico;
- HTML semântico;
- Foco visível para navegação por teclado.

---

## Projetos apresentados

O portfólio apresenta os seguintes projetos:

1. Finance Control
2. Catálogo de Produtos Laravel
3. Sistema de Clínica Veterinária
4. Monitor de Cotações
5. Loja de Cards
6. GitHub Stalker

O projeto de Clínica Veterinária é apresentado sem link público porque o repositório atualmente é privado.

---

## Informações profissionais

### Nome

Carlos Vinicius Moreira da Silva

### Cargo

Desenvolvedor Web PHP Júnior

### Formação

Técnico em Desenvolvimento de Sistemas

Firjan SENAI Resende

2026 — 2027

Situação: Em andamento

### Localização

Quatis, Rio de Janeiro, Brasil

### Objetivo

Primeira oportunidade profissional como:

- Desenvolvedor PHP/Laravel Júnior
- Estagiário

---

## Contato

E-mail:

carlos.vinicius582@gmail.com


GitHub:

https://github.com/carlosvinims


LinkedIn:

https://linkedin.com/in/carlosvinims


---

## Executar localmente

Como o projeto é estático, não é necessário servidor.

A maneira mais simples é abrir:

index.html


diretamente no navegador.

Também é possível utilizar uma extensão como Live Server no VS Code para facilitar o desenvolvimento.

---

## Publicar no GitHub Pages

### 1. Criar o repositório

Crie um repositório no GitHub.

Para um site pessoal, uma opção é utilizar:

carlosvinims.github.io


---

### 2. Adicionar os arquivos

Envie toda a estrutura:

index.html assets/ README.md


Não altere a estrutura dos diretórios.

---

### 3. Verificar a imagem

Confirme se sua foto está exatamente em:

assets/images/perfil.jpg


O nome precisa respeitar maiúsculas e minúsculas.

---

### 4. Configurar GitHub Pages

No GitHub:

Settings → Pages → Build and deployment → Source → Deploy from a branch


Selecione:

Branch: main Folder: / (root)


Depois salve.

---

### 5. Aguardar a publicação

O GitHub Pages fará a publicação automaticamente.

O endereço final dependerá do nome do repositório.

Para um repositório chamado:

carlosvinims.github.io


o endereço será:

https://carlosvinims.github.io/


---

## Checklist antes da publicação

- [ ] Colocar `perfil.jpg` em `assets/images/`
- [ ] Testar todos os links do GitHub
- [ ] Testar LinkedIn
- [ ] Testar o botão de e-mail
- [ ] Testar menu mobile
- [ ] Testar filtros de projetos
- [ ] Testar em celular
- [ ] Testar em tablet
- [ ] Testar em desktop
- [ ] Verificar console do navegador
- [ ] Verificar se não existe rolagem horizontal
- [ ] Confirmar que o repositório da clínica veterinária continua sem link público
- [ ] Fazer o primeiro deploy no GitHub Pages

---

## Acessibilidade

O projeto utiliza:

- HTML semântico;
- textos alternativos;
- `aria-label` quando necessário;
- navegação por teclado;
- estados de foco;
- contraste adequado;
- botões com tamanho apropriado;
- suporte a `prefers-reduced-motion`.

---

## Manutenção

Para adicionar um novo projeto, copie a estrutura de um dos elementos:

<article class="project-card glass-card">


e altere:

- nome;
- descrição;
- status;
- tecnologias;
- categoria;
- link do GitHub.

Para adicionar uma nova tecnologia, inclua um novo:

<span class="tech-badge"> Tecnologia </span>


---

## Observação sobre conteúdo

O portfólio foi construído utilizando somente informações fornecidas pelo proprietário.

Não foram adicionados:

- empregos fictícios;
- clientes;
- certificados não informados;
- números de experiência;
- resultados profissionais inventados;
- tecnologias não informadas;
- projetos inexistentes;
- depoimentos fictícios.

O projeto de Clínica Veterinária é deliberadamente apresentado como projeto de estudo sem link público enquanto o repositório permanecer privado.