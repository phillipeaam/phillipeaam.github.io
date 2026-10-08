# Feature Specification: Projects Catalog Discovery

**Feature Branch**: `[006-projects-catalog]`
**Created**: 2026-10-04
**Status**: Draft
**Updated**: 2026-10-07 — reconciliação do inventário corrente (21 entradas), validação de Pandora e autorização de uso dos arquivos de mídia existentes no catálogo.
**Input**: Redesenhar `/projects/` como catálogo compacto pesquisável, com cabeçalho no padrão da Home, busca/facetas rotuladas, no máximo um menu de filtro aberto por vez, contador e detalhes expansíveis junto a cada projeto. Todos os projetos devem ser reconhecíveis sem depender de miniaturas, hover ou rolagem horizontal. Complementos da avaliação 2026-10-05: descoberta Unity/Unity 6, nomes permanentes nos cartões More Projects da Home, validação de mídia/acessibilidade e alinhamento de períodos/escopo com cases e Experience.

## Clarifications

### Session 2026-10-04

- Q: Ao abrir os detalhes de um projeto, a pessoa deve poder manter os detalhes de outros projetos abertos para comparar? → A: Permitir que vários projetos permaneçam expandidos ao mesmo tempo, cada um com expansão e recolhimento independentes.
- Q: Como os filtros Context e Technology devem permitir seleção de valores? → A: Apresentar os dois como menus separados com busca e multisseleção.
- Q: Como tratar GIFs cuja origem ou autorização ainda não está documentada? → A: Mostrar apenas GIFs com origem e autorização verificadas; os demais ficam fora dos detalhes até que a documentação exista.
- Q: Como a mídia verificada deve aparecer ao abrir Project details? → A: Em uma coluna ao lado dos detalhes no desktop e acima deles no celular.

### Session 2026-10-05

- Q: Qual cabeçalho deve identificar o catálogo completo? → A: Reutilizar o padrão aprovado da seção More Projects na Home, com eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o mesmo texto de apoio.
- Q: Como os controles de busca e facetas devem ser identificados? → A: Usar “Search for” acima do campo de busca e “Context” e “Technology” acima de seus respectivos seletores.
- Q: Quantos seletores de faceta podem ficar abertos ao mesmo tempo? → A: No máximo um; abrir Context fecha Technology e vice-versa, preservando as seleções feitas em cada faceta.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reconhecer e percorrer o catálogo (Priority: P1)

Como visitante, quero ver os projetos disponíveis em uma lista compacta, reconhecível e organizada, para escolher o que vale aprofundar sem ler 21 fichas longas em sequência.

**Why this priority**: A descoberta do conjunto é o problema principal. O catálogo deve continuar útil mesmo que a pessoa não use busca, filtros, imagens ou comportamento interativo opcional.

**Independent Test**: Abrir `/projects/` em desktop e celular e verificar se todos os resultados têm nome e resumo identificáveis, se grupos sem resultados não confundem e se nenhum projeto depende de poster ou hover para ser reconhecido.

**Acceptance Scenarios**:

1. **Given** o arquivo contém projetos com e sem mídia, **When** a pessoa abre a página, **Then** encontra uma entrada textual reconhecível para cada projeto publicado.
2. **Given** um projeto tem fatos de contexto, contribuição ou período verificados, **When** a pessoa percorre sua entrada, **Then** a entrada recolhida apresenta nome e descrição curta; contexto, contribuição, período e tecnologias ficam nos detalhes, sem atribuir fatos ausentes.
3. **Given** a pessoa abre a página em viewport estreito, **When** percorre os resultados, **Then** consegue ler cada entrada sem rolagem horizontal da página e sem depender de hover.
4. **Given** a pessoa abre a página, **When** compara o cabeçalho e as entradas com a Home, **Then** vê a composição aprovada da seção “More Projects”, com título “All Projects”, chips de tecnologia apenas nos detalhes expandidos e divisores uniformes.

5. **Given** um projeto possui mídia principal e ícone aprovados, **When** sua entrada está recolhida, **Then** a mídia aparece à esquerda e o ícone antes do título à direita no desktop; no celular, a mídia fica acima, mantendo título, descrição e expansão legíveis.
6. **Given** um projeto não possui mídia ou ícone aprovado, **When** sua entrada é apresentada, **Then** título, descrição e detalhes disponíveis continuam utilizáveis sem áreas visuais vazias.

### User Story 2 - Encontrar projetos por texto e facetas (Priority: P1)

Como recrutador ou profissional da indústria, quero pesquisar palavras presentes nas fichas e combinar contexto profissional com tecnologia, para localizar projetos relevantes ao meu interesse.

**Why this priority**: Os 21 projetos cobrem produtos, jogos e estudos diversos. Busca e facetas permitem chegar a um subconjunto sem esconder o conjunto completo quando os controles não são usados.

**Independent Test**: Aplicar uma matriz de consultas, valores de contexto e tecnologias; comparar os nomes e o contador resultantes com os dados públicos de origem.

**Acceptance Scenarios**:

1. **Given** nenhuma busca ou faceta está selecionada, **When** a página é aberta, **Then** o resumo informa que os 21 projetos atuais estão disponíveis.
2. **Given** uma consulta corresponde ao nome, resumo, contribuição ou metadados públicos de projetos, **When** a pessoa pesquisa, **Then** somente as entradas correspondentes permanecem na lista e o contador atualiza.
3. **Given** mais de um valor está selecionado dentro de Context ou Technology, **When** os resultados são calculados, **Then** basta corresponder a um dos valores daquela faceta.
4. **Given** há busca e valores em ambas as facetas, **When** os resultados são calculados, **Then** cada projeto corresponde à busca, a pelo menos um Context selecionado e a pelo menos uma Technology selecionada.
5. **Given** uma combinação não corresponde a nenhum projeto, **When** a pessoa vê os resultados, **Then** recebe uma mensagem clara e uma ação para limpar os critérios.
6. **Given** a pessoa abre Context ou Technology, **When** pesquisa opções e seleciona mais de um valor, **Then** cada menu reduz somente suas próprias opções por texto e mantém as escolhas múltiplas independentes.
7. **Given** um menu de faceta está aberto, **When** a pessoa abre o outro, **Then** o primeiro menu fecha, o segundo abre e os valores selecionados no primeiro permanecem ativos.
8. **Given** um projeto registra uma versão confirmada de Unity, **When** a pessoa consulta opções de Technology, **Then** existe somente uma opção de filtro `Unity`, sem opções separadas para versões; a versão específica pode continuar como fato nos detalhes.
9. **Given** Pathless registra Unity 6, **When** a pessoa pesquisa ou filtra por `Unity`, **Then** Pathless aparece nos resultados, o filtro oferece apenas `Unity` e os detalhes continuam mostrando Unity 6 quando esse fato estiver publicado.

### User Story 3 - Aprofundar um projeto e seguir seus links (Priority: P2)

Como visitante, quero expandir uma entrada no próprio lugar para ler detalhes e abrir cases ou fontes disponíveis, sem perder meu contexto no catálogo.

**Why this priority**: Resumos dão visão comparável; detalhes sob demanda preservam as histórias técnicas e reduzem leitura obrigatória.

**Independent Test**: Abrir e recolher entradas representativas com e sem case, mídia, CTA ou detalhes adicionais; verificar associação correta de fatos e links e preservar posição/foco.

**Acceptance Scenarios**:

1. **Given** uma entrada possui detalhes públicos adicionais, **When** a pessoa ativa “More details”, **Then** os detalhes daquele mesmo projeto são exibidos junto à entrada.
2. **Given** uma entrada possui um estudo de caso, **When** a pessoa escolhe o link, **Then** chega ao case correspondente; o link mantém nome acessível e destino correto.
3. **Given** uma entrada não possui mídia, detalhes expansíveis ou ação externa válida, **When** é apresentada, **Then** não mostra controles vazios nem promete conteúdo indisponível.
4. **Given** uma pessoa abre um deep link existente de projeto, **When** a página carrega, **Then** o item correspondente continua localizável mesmo se a organização visual do arquivo mudar.
5. **Given** os detalhes de um projeto estão abertos, **When** a pessoa expande outro projeto, **Then** ambos permanecem abertos e podem ser recolhidos independentemente.
6. **Given** um projeto tem mídia aprovada por evidência, **When** a pessoa abre seus detalhes, **Then** a mídia principal já aparece na entrada recolhida, à esquerda do título/descrição no desktop e acima deles no celular; expandir revela os dados adicionais sem duplicar a mídia principal, com alternativa estática e movimento reduzido, sem controles Stop/Play conforme FR-014.

7. **Given** uma entrada está recolhida, **When** a pessoa expande More details, **Then** encontra contexto, contribuição, período, tecnologias e ações existentes, sem repetir a mídia principal nem o mesmo resumo.

### User Story 4 - Usar navegação acessível e conteúdo essencial sem scripts (Priority: P1)

Como pessoa que navega por teclado, leitor de tela, toque ou com movimento reduzido, quero acessar controles e conteúdo sem depender de uma modalidade de interação específica.

**Why this priority**: Descoberta que não funciona para diferentes modos de navegação exclui visitantes do caminho principal.

**Independent Test**: Percorrer controles/resultados por teclado e leitor de tela, testar redução de movimento e conferir o catálogo legível quando comportamentos interativos opcionais não estiverem disponíveis.

**Acceptance Scenarios**:

1. **Given** a pessoa usa somente teclado, **When** navega, filtra e expande um item, **Then** a ordem de foco é previsível, o foco visível e nenhum controle prende a navegação.
2. **Given** uma pessoa usa tecnologia assistiva, **When** interage com filtros, contador e detalhe, **Then** rótulos, estado e mudanças relevantes são comunicados sem mover foco inesperadamente.
3. **Given** a preferência de redução de movimento está ativa, **When** a pessoa vê o catálogo ou abre detalhes, **Then** animação não é necessária para entender ou operar o conteúdo.
4. **Given** comportamentos interativos opcionais não estão disponíveis, **When** a pessoa abre a página, **Then** entradas, conteúdo essencial e links continuam disponíveis em forma legível.

5. **Given** um GIF com autoplay configurado está distante da área visível, **When** a pessoa se aproxima da entrada, **Then** o GIF começa a carregar na faixa de aproximação e o fallback permanece até estar pronto.
6. **Given** a animação falha ou movimento reduzido é ativado durante a carga, **When** a solicitação termina, **Then** a alternativa estática permanece visível e links continuam utilizáveis.
7. **Given** uma página usa mídia de projeto, **When** ela é inspecionada em qualquer superfície, **Then** não apresenta controles Stop/Play ou equivalentes, e a ausência do controle não é relatada como prova de conformidade completa para animação contínua.
8. **Given** GIF bloqueado, resposta inválida, falha de decode ou ausência de JavaScript, **When** a página é apresentada, **Then** o fallback estático, texto e links permanecem utilizáveis.
9. **Given** o movimento reduzido está ativo no início ou muda durante carregamento, **When** a mídia atualiza seu estado, **Then** nenhuma animação incompatível é revelada e o fallback permanece.
10. **Given** uma pessoa usa teclado ou leitor de tela nos filtros e disclosures, **When** pesquisa, abre, fecha ou perde resultados, **Then** nomes, estado, foco e contador continuam compreensíveis sem ARIA roles que não correspondam ao comportamento real.
11. **Given** a navegação aguarda documento ou fontes, **When** fontes demoram/falham ou a pessoa retorna a uma posição salva, **Then** a página não permanece em branco nem mostra um deslocamento inicial enganoso antes da posição restaurada.
12. **Given** uma rota tem conteúdo de página, **When** a pessoa a navega com tecnologia assistiva, **Then** encontra um único landmark principal para o conteúdo.

### User Story 5 - Avaliar contribuição e profundidade técnica (Priority: P1)

Como recrutador ou avaliador técnico, quero entender a atuação individual e os mecanismos relevantes de cada projeto, para avaliar experiência profissional sem ler três blocos repetitivos ou confundir produto e autoria.

**Why this priority**: A descoberta já identifica o produto; o aprofundamento deve tornar concreta a competência do profissional, mantendo os limites da evidência.

**Independent Test**: Revisar entradas representativas de trabalho profissional, independente e contribuição limitada, comparando cada afirmação com sua fonte e verificando organização, campos ausentes e busca dos destaques.

**Acceptance Scenarios**:

1. **Given** uma entrada com contribuição e mecanismos comprovados, **When** a pessoa abre More details, **Then** vê fatos compactos seguidos de Selected contributions, com um parágrafo de atuação e dois ou três destaques específicos quando disponíveis, em vez de três blocos obrigatórios repetitivos.
2. **Given** evidência limitada, **When** os detalhes são abertos, **Then** a seção pode ter apenas parágrafo ou um destaque, sem inventar resultados para completar a estrutura.
3. **Given** ausência de contribuição individual comprovada, **When** a pessoa abre a entrada, **Then** continua vendo produto e fatos/destinos disponíveis sem Selected contributions vazio ou autoria inferida.
4. **Given** um mecanismo documentado mas sua decisão individual não atribuída, **When** o conteúdo o descreve, **Then** distingue funcionamento técnico de atuação pessoal e conserva limites de equipe e época.
5. **Given** metadados com função, organização, tipo, período e tecnologias comprovados, **When** os detalhes aparecem, **Then** cada fato ocupa sua dimensão definida, com rótulo/valor compactos e sem duplicações entre campos.
6. **Given** um termo presente somente em um destaque público, **When** a pessoa pesquisa por ele, **Then** encontra a entrada correta; texto privado ou retirado não produz resultado.
7. **Given** entrada expandida no desktop ou celular, **When** a pessoa lê os detalhes por teclado ou tecnologia assistiva, **Then** acessa conteúdo organizado abaixo das duas colunas, sem mudança do cabeçalho, das mídias ou da largura de texto aprovada; sem scripts, a expansão de fallback continua utilizável.

### User Story 6 - Reconhecer projetos na Home (Priority: P2)

Como visitante, quero identificar pelo nome cada projeto mostrado nos cartões da Home, para reconhecer o trabalho sem depender de arte, hover ou memória do destino.

**Why this priority**: A avaliação identificou cartões de More Projects cujo título está visualmente oculto; uma imagem não é identificação textual suficiente.

**Independent Test**: Percorrer os cartões de projeto da Home no estado inicial sem hover, com imagem, placeholder e mídia ausente, em desktop e celular, verificando nome visível e nome acessível do destino.

**Acceptance Scenarios**:

1. **Given** um cartão de More Projects é apresentado, **When** não há interação de ponteiro ou foco, **Then** o nome do projeto já está visível.
2. **Given** a mídia de um cartão é placeholder, falha ou não existe, **When** a Home é exibida, **Then** o nome e o destino do projeto continuam identificáveis.
3. **Given** um projeto tem nome longo, **When** o cartão é visto em tela estreita ou ampliada, **Then** seu nome reflowa sem sobrepor mídia, resumo ou ações.
4. **Given** o cartão é acessado por teclado ou leitor de tela, **When** a pessoa encontra o link, **Then** ele tem nome acessível correspondente ao projeto e não anuncia o mesmo título redundantemente.

### User Story 7 - Comparar período e escopo entre superfícies (Priority: P2)

Como visitante ou avaliador, quero interpretar períodos e contribuições de um projeto junto à experiência profissional relacionada, para distinguir a duração do emprego das fases e do escopo de cada projeto.

**Why this priority**: Datas ou descrições parecidas podem representar períodos diferentes. Clarificar a relação evita aparentes contradições e atribuições excessivas.

**Independent Test**: Revisar os registros compartilhados e as superfícies aplicáveis de Ello 2.0, Read With Ello e Wallace’s Quest; rastrear cada período e limite de escopo à fonte correspondente e registrar divergências não resolvidas.

**Acceptance Scenarios**:

1. **Given** a ficha de Ello 2.0 informa Sep–Nov 2025 e Experience informa o vínculo profissional com Ello de Oct 2022–Dec 2025, **When** as superfícies são comparadas, **Then** os períodos são identificados como período do projeto e período do emprego, sem conflito presumido.
2. **Given** Read With Ello e Ello 2.0 aparecem associados à mesma experiência, **When** a pessoa compara seus escopos, **Then** tecnologia, trabalho documentado e limites individuais de cada projeto permanecem distintos e não atribuem backend, speech, conteúdo ou release sem fonte.
3. **Given** Wallace’s Quest apresenta combate histórico, trabalho de busca em grade e revisita posterior, **When** as datas aparecem em catálogo e case, **Then** fases diferentes só são reunidas ou separadas conforme as fontes as sustentem, sem apagar que a migração de 2026 não reconectou completamente os sistemas.
4. **Given** duas fontes discordam sobre período ou escopo, **When** não há evidência suficiente para resolver a divergência, **Then** ela é registrada como pendente para revisão, sem normalização silenciosa ou publicação de uma conclusão inferida.
5. **Given** um projeto não possui página de case ou não se relaciona a um vínculo específico de Experience, **When** a consistência é revisada, **Then** não se cria página, relação ou afirmação para preencher a lacuna.

### Edge Cases

- Contribuição limitada pode produzir apenas um parágrafo ou um único destaque comprovado; não fabricar conteúdo para atingir dois ou três destaques.
- Produto sem contribuição individual comprovada conserva descrição, fatos e destinos disponíveis, sem seção Selected contributions vazia nem atribuição inferida a partir de mídia ou cargo.
- Uma fonte pode descrever o funcionamento do sistema sem comprovar quem decidiu sua arquitetura; distinguir descrição técnica e autoria individual.
- Fontes canônicas recentes podem corrigir registros locais históricos. Preservar o histórico documental, mas não publicar afirmações superadas; conflitos factuais devem ser registrados para revisão editorial.
- A reorganização editorial pode remover termos redundantes; todo conteúdo público efetivamente apresentado, incluindo destaques expandidos, deve continuar pesquisável, sem indexar notas privadas ou texto histórico retirado.

- Mídia principal ausente, GIF sem fallback válido ou falha do ícone não podem impedir identificação textual; mídia complementar não deve duplicar a principal.
- Busca vazia, somente espaços, sem acentos ou com diferenças de caixa deve ter comportamento previsível; normalizar caixa, espaços laterais e diacríticos para facilitar correspondência em português.
- Busca dentro de uma faceta sem correspondência deve mostrar estado vazio no próprio menu e não deve alterar projetos nem contador até uma opção ser marcada.
- Texto pode corresponder a vários projetos ou somente a metadados; o contador acompanha projetos correspondentes, não palavras ou mídias.
- Uma faceta sem valores selecionados não restringe resultados; limpar filtros restaura o conjunto completo.
- Projetos sem período, stack, contribuição confirmada, mídia, case ou CTA exibem somente informação existente e verificada.
- Uma combinação pode esconder entradas atualmente expandidas; a lista resultante mantém posição/foco compreensíveis e nenhum detalhe de projeto oculto permanece apresentado.
- Quando um grupo editorial não possui resultados após filtrar, sua ausência não deve ser confundida com falha ou perda de projetos.
- Entradas com nomes longos, descrições em português e inglês ou muitos metadados continuam legíveis em tela estreita e com zoom.
- Hashes e links antigos apontando a projetos devem continuar levando ao registro correspondente, mesmo se os resultados forem filtrados.
- Conteúdo ou mídia de provenance não confirmada não é promovido à lista como prova aprovada; o registro textual continua disponível conforme os limites das fontes canônicas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A página MUST apresentar uma entrada identificável para cada projeto publicado no arquivo, atualmente 21, sem exigir seleção por miniatura ou rolagem horizontal.
- **FR-002**: Cada entrada recolhida MUST apresentar nome, resumo conciso do produto, pôster como ícone antes do título quando aprovado e mídia principal quando aprovada. Contexto, contribuição, período, tipo de produto, tecnologias e ações MUST aparecer somente nos detalhes expandidos quando disponíveis e verificados; não repetir o resumo ou a mídia principal desnecessariamente.
- **FR-003**: O arquivo MAY preservar agrupamentos editoriais úteis, mas MUST manter contexto profissional, tipo de produto e tecnologias como dimensões distintas e não induzir classificação incorreta.
- **FR-004**: A pessoa MUST poder pesquisar por nome, descrição do produto, contribuição e metadados públicos apresentados no arquivo, incluindo tecnologias e contexto.
- **FR-005**: A busca MUST ignorar caixa, espaços no início/fim e diferença entre letras acentuadas e não acentuadas; MUST atualizar quais entradas correspondem à consulta.
- **FR-006**: A pessoa MUST poder filtrar por Context e Technology em menus de seleção separados, com busca e seleção de múltiplos valores. Valores disponíveis MUST vir dos dados verificados dos projetos; etiquetas não podem ser inferidas apenas por semelhança de nome.
- **FR-007**: Sem seleção em uma faceta, essa faceta não restringe resultados. Múltiplos valores na mesma faceta MUST usar OR; busca e facetas distintas MUST combinar por AND.
- **FR-008**: A página MUST exibir número de projetos correspondentes e total não filtrado, por exemplo “Showing 4 of 21 projects”; a contagem MUST corresponder a todas as entradas do resultado, não somente às que cabem no viewport.
- **FR-009**: A pessoa MUST poder remover valores selecionados e limpar todos os filtros e a consulta em uma ação identificável.
- **FR-010**: Um conjunto sem correspondências MUST exibir estado vazio compreensível e ação para limpar critérios sem ocultar a consulta e os filtros atuais.
- **FR-011**: Cada entrada com detalhes adicionais MUST permitir expansão e recolhimento independentes no próprio contexto do item; várias entradas podem permanecer expandidas simultaneamente e seu estado aberto/fechado deve ser comunicado. Busca/filtragem não pode apresentar detalhes pertencentes a uma entrada que deixou de corresponder.
- **FR-012**: Links para os quatro estudos de caso existentes, ações externas válidas e identificadores de deep link MUST permanecer associados ao projeto correto. Destinos ausentes não podem gerar CTA vazio ou enganoso.
- **FR-013**: A ausência de poster ou de autorização/provenance de mídia não pode impedir reconhecimento textual do projeto nem levar à apresentação de placeholder como evidência real.
- **FR-014**: Mídia animada MUST manter alternativa estática precisa e respeitar preferência de redução de movimento. Conforme decisão explícita do usuário em 2026-10-05, nenhuma página do site deve renderizar botão Stop/Play ou controle equivalente de animação. Preservar acionamento configurado, fallback e movimento reduzido; isso não declara conformidade completa do movimento automático contínuo.
- **FR-015**: Os controles MUST ter rótulos, semântica e estado acessíveis; operações MUST funcionar por teclado e toque, com foco visível e sem dependência de hover.
- **FR-016**: O conteúdo essencial e links MUST permanecer legíveis e utilizáveis quando comportamentos interativos opcionais não estão disponíveis; controles sem comportamento funcional MUST não ser apresentados como ativos.
- **FR-017**: Em larguras móveis, entradas, controles e detalhes com mídia MUST adaptar-se sem sobreposição, perda de conteúdo essencial ou rolagem horizontal da página; a mídia principal aprovada fica acima da identidade e descrição da entrada no celular; os detalhes aparecem junto à mesma entrada abaixo do resumo.
- **FR-018**: A feature MUST preservar a identidade visual editorial aprovada e limitar mudanças a `/projects/` e aos consumidores compartilhados diretamente necessários para descoberta na Home, carregamento/acessibilidade de mídia e consistência factual com cases e Experience. Não autoriza redesenho geral nem mudança automática da ordem de projetos destacados.
- **FR-019**: A entrada recolhida MUST conservar a allowlist exata de fontes autorizadas pelo usuário para reutilização em Ello Learn, Read With Ello, Pathless, Wallace’s Quest, Diggy e Pandora, conforme os caminhos registrados em `evaluation.md`. Para Diggy, o usuário forneceu `public/projects/diggy-poster.png` e `public/projects/diggy-gameplay-preview.gif` e solicitou sua inclusão no catálogo; o pôster WebP e o fallback do primeiro quadro são derivados desses arquivos. Em 2026-10-07, o pedido para preencher a entrada Pandora com referência às mídias existentes na pasta do jogo autorizou o uso no catálogo dos arquivos exatos ali registrados. A decisão de reutilização MUST não ser descrita como comprovação independente de direitos de terceiros. Mídia nova ou diferente da allowlist MUST permanecer oculta sem documentação de origem e autorização; mídia complementar elegível pertence aos detalhes.
- **FR-020**: Detalhes expandidos MUST apresentar, em ordem, fatos compactos disponíveis (Role, Context, Type e Period), a seção Selected contributions quando sustentada por evidência, tecnologias e demais metadados úteis, mídia complementar aprovada quando existente e ações válidas. Product, Contribution e Engineering focus MUST deixar de ser três blocos obrigatórios separados; informação relevante MUST ser reorganizada sem perda de limites de autoria. Grupos sem conteúdo MUST ser omitidos.
- **FR-021**: Entradas do catálogo MUST usar divisores consistentes em espessura, cor, espaçamento e continuidade, sem variação visual involuntária entre projetos.
- **FR-022**: O cabeçalho de `/projects/` MUST reutilizar o padrão aprovado da seção “More Projects” na Home, com eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o mesmo texto de apoio. MUST omitir o rótulo “PROJECT ARCHIVE” e a apresentação anterior.
- **FR-023**: A busca dentro de um menu de faceta MUST limitar apenas as opções visíveis naquele menu até que a pessoa selecione/desmarque valores; o texto digitado no menu não pode, sozinho, filtrar projetos nem alterar o contador de projetos.
- **FR-024**: O campo de busca MUST ter o rótulo visível “Search for”; as facetas MUST ter rótulos visíveis “Context” e “Technology” acima de seus respectivos controles de seleção.
- **FR-025**: No máximo um menu de faceta pode estar aberto por vez. Abrir um menu MUST fechar o outro sem limpar, alterar ou perder valores selecionados nele; ativar novamente o menu aberto MUST recolhê-lo.

- **FR-026**: No desktop, a entrada recolhida MUST organizar mídia principal à esquerda e, à direita, identidade (ícone antes do título), descrição curta e “More details”, cujo indicador mostra “+” recolhido e “−” expandido. O controle MUST conservar sua posição junto à descrição, nome e estado acessíveis, teclado e toque. Detalhes MUST ocupar uma segunda linha abaixo de ambas as colunas, usando a largura disponível, associados ao item sem navegação para outra página. Sem scripts, preservar expansão utilizável; o controle nativo de fallback pode acompanhar o início dos detalhes.
- **FR-027**: O ícone MUST reutilizar a apresentação anterior: 52×52, cantos arredondados de 10px, borda discreta, imagem recortada sem distorção e espaço de 14px até o título. Pode coexistir com a mídia principal à esquerda, pois identifica o projeto. Sem pôster aprovado, MUST omitir o ícone sem espaço vazio; o título continua suficiente. O ícone redundante ao título MUST não duplicar o anúncio do nome em leitores de tela.
- **FR-028**: A mídia MUST preservar as configurações existentes de dimensões, proporção, enquadramento, legenda e acionamento. Para autoplay configurado, a animação MUST ser solicitada ao aproximar-se da área visível (referência existente: margem de 75% da altura da janela), sem exigir expansão ou hover. Não impor pausa inicial como nova regra; movimento reduzido prevalece e nenhum consumidor do componente apresenta controle Stop/Play, conforme FR-014. Projetos sem autoplay configurado MUST conservar seus acionamentos existentes.
- **FR-029**: Cada GIF MUST manter sua alternativa estática existente e precisa, derivada do primeiro frame, visível desde o conteúdo inicial e durante carregamento/preparação. A animação MUST substituir a imagem apenas quando pronta, sem mudar a geometria da área. Falha de carregamento/preparação MUST manter o fallback e os links utilizáveis. Movimento reduzido MUST impedir solicitação/revelação automática do GIF e manter o fallback, inclusive se a preferência mudar durante o carregamento. Apenas a descrição da camada visível deve ser anunciada.
- **FR-030**: Sem GIF aprovado, a entrada MAY usar mídia estática aprovada existente. Sem mídia principal aprovada, MUST usar composição textual sem coluna vazia, placeholder de evidência ou dados inventados; um ícone aprovado pode continuar antes do título. Sem detalhes adicionais ou destinos válidos, MUST omitir controles/CTAs vazios. Sem scripts, fallback, texto, detalhes e links MUST permanecer utilizáveis.
- **FR-031**: O cabeçalho All Projects MUST conservar tipografia, entrelinha de 24px do texto de apoio e espaçamentos já aprovados. Os requisitos pontuais de nome visível nos cartões Home e de coerência factual entre catálogo, cases e Experience são exceções explícitas a outras áreas; não autorizam mudanças visuais ou editoriais fora desse escopo.
- **FR-032**: Selected contributions MUST começar por um parágrafo curto de uma ou duas frases sobre atuação individual e escopo comprovados. Quando disponíveis, MUST incluir dois ou três destaques técnicos distintos com títulos específicos do projeto. Com evidência limitada, MAY apresentar um único destaque ou apenas o parágrafo; sem contribuição comprovada, MUST omitir a seção. Não cortar limites de autoria essenciais para cumprir a extensão.
- **FR-033**: Cada destaque MUST explicar um problema concreto e o mecanismo empregado quando ambos forem documentados; consequências, decisões pessoais, resultados e métricas MUST aparecer apenas quando suas fontes os sustentarem. Funcionamento geral do sistema MUST não ser apresentado como decisão ou autoria individual sem comprovação. Não exigir um resultado ou uma métrica para completar a ficha.
- **FR-034**: A reorganização MUST preservar informações relevantes verificadas sem concatenar automaticamente os três textos antigos. MUST eliminar afirmações repetidas que não acrescentam informação. Contexto adicional do produto MAY integrar o trecho relevante apenas quando necessário para entender a contribuição; não repetir a descrição recolhida nem duplicar estudos de caso completos. Exemplos da pesquisa MUST não ser tratados como textos aprovados para publicação.
- **FR-035**: Role MUST representar função/escopo individual; Context, organização/equipe/circunstância; Type, natureza do produto; Period, período documentado; Technology, tecnologias confirmadas. Os fatos MUST usar rótulo e valor na mesma linha quando houver espaço, com quebra natural no celular. MUST evitar função duplicada em Context, classificação profissional repetida e stack em Type; omitir valores ausentes, sem inferência. A classificação usada pela faceta Context permanece distinta do texto contextual exibido.
- **FR-036**: A busca MUST incluir o conteúdo público revisado, inclusive parágrafo de atuação, títulos/textos dos destaques e contexto adicional apresentado nos detalhes. MUST excluir notas privadas, histórico superado e rascunhos não publicados. Filtros, contador, OR/AND, ordem editorial, deep links, quatro cases e expansão independente MUST preservar seus comportamentos existentes.
- **FR-037**: Esta revisão MUST preservar composição responsiva, mídias existentes autorizadas para reutilização, fallback, carregamento por aproximação, movimento reduzido, posição de More details e configurações visuais aprovadas. MUST não reintroduzir limites de largura de texto removidos sem decisão específica do usuário. Mudanças na Home e nos cases limitam-se aos requisitos explicitamente definidos por FR-018, FR-039 e FR-044.
- **FR-038**: A faceta Technology MUST expor uma única tag canônica `Unity`, sem opções distintas para versões (`Unity 6`, por exemplo). Registros cujo campo factual de tecnologia/engine confirme qualquer versão de Unity MUST usar essa tag no filtro, sem inferência por título ou descrição. Valores de versão já confirmados podem permanecer como fatos detalhados separados, sem gerar outra opção de faceta. A busca e filtros OR/AND atuais MUST permanecer.
- **FR-039**: Cada cartão de projeto da Home em More Projects MUST mostrar o nome do projeto em seu estado padrão, sem exigir hover, foco, animação ou interpretação da imagem. O título MUST continuar compreensível com placeholder, falha ou ausência de mídia, reflowar em telas estreitas/ampliadas e evitar anúncio redundante para leitor de tela. Cartões de destaque que já mostram nome não precisam ganhar outra ficha textual.
- **FR-040**: A validação de mídia MUST cobrir carregamento distante e aproximação à faixa configurada, fallback até a mídia estar pronta, falha de rede/resposta/preparação, mudança de movimento reduzido durante carga, hover/foco quando configurados, fallback sem JavaScript e o caminho existente quando a detecção de proximidade está indisponível. Os resultados MUST distinguir inspeção de fonte de cenários realmente executados e MUST registrar pedidos de rede, condições e viewports efetivamente observados.
- **FR-041**: Preferência `prefers-reduced-motion` MUST manter o fallback e impedir solicitação ou revelação animada conforme o comportamento atual documentado, inclusive após mudança durante a carga. Nenhuma superfície MUST renderizar botão Stop/Play ou controle equivalente; a ausência desses controles MUST NOT ser declarada, por si só, como conformidade WCAG completa para animação contínua.
- **FR-042**: A validação de navegação MUST incluir demora/falha de fontes, liberação de conteúdo e restauração de posição após retorno, evitando tela vazia persistente, exibição inicial na posição errada ou deslocamento perceptível antes de chegar à posição restaurada. Resultados precisam vir de cenários realmente executados, não de inspeção de fonte apenas.
- **FR-043**: Filtros, disclosures e navegação MUST ter nomes/estados acessíveis inspecionáveis na árvore de acessibilidade do navegador, além de interação por teclado, foco visível, Escape/recolhimento, alteração da contagem e item ocultado por filtro. Rótulos e semântica MUST corresponder à interação real; um menu de opções MUST NOT ser apresentado como um controle de combinação pesquisável se não oferecer esse comportamento. Cada rota avaliada MUST apresentar um único landmark principal. Teste de fala com leitor de tela real foi removido do escopo por decisão do usuário em 2026-10-07; esta spec não declara validação auditiva nem auditoria WCAG completa.
- **FR-044**: Períodos, tecnologias, contribuição e limites de autoria compartilhados MUST ser compatíveis entre registro central, catálogo, case quando existente e Experience. A revisão MUST distinguir período do projeto/fase de período de emprego, preservar fases de manutenção/revisita quando comprovadas e manter escopo individual separado do trabalho de equipe. Divergências sem solução documental MUST ser registradas como pendentes, sem normalização ou expansão de autoria.
- **FR-045**: Quando um registro usar ícone de identidade aprovado, `projectsIndexTitleIcon` MUST ser a referência canônica reutilizada no catálogo e na Featured aplicável; o ícone MUST ser derivado sem sobrescrever a arte original, quadrado, WebP otimizado de 104 × 104 px e apresentado no slot de 52 × 52 CSS px com assunto reconhecível e opticamente centralizado. Arte de produto/empresa MUST preservar identidade e design fornecidos, salvo direção explicitamente aprovada. Ícone ausente ou sem aprovação MUST ser omitido sem espaço reservado; o título continua sendo a identidade acessível. `catalogIconReuseApproved` MUST se aplicar somente ao ícone exato do registro e não representar verificação independente de direitos. O procedimento permanente está em `docs/project-icon-standard.md`.
- **FR-046**: Nas entradas do catálogo renderizadas por `ProjectRecord.astro`, o título e, quando houver, o ícone aprovado MUST estar dentro de um único link `archive-record__identity-link` direcionado ao fragmento estável do próprio registro. Toda a área visual da identidade (ícone e título) MUST ser acionável, com hover e foco de teclado visíveis. O link MUST NOT englobar mídia, resumo, disclosure ou ações, e MUST NOT conter links interativos aninhados. A identidade mantém seu nome acessível pelo título; o ícone redundante permanece decorativo.

### Key Entities *(include if feature involves data)*

- **Project entry**: Nome, resumo do produto, contexto profissional/independente/estudo, contribuição, período, tecnologias verificadas, grupo editorial, mídia, case/destinos e identificador estável, conforme campos existentes.
- **Search query**: Texto inserido pela pessoa, aplicado às informações públicas pesquisáveis de cada projeto.
- **Context facet**: Contexto de trabalho de um projeto, separado de sua tecnologia e da natureza do produto.
- **Technology facet**: Tecnologia confirmada associada ao projeto; múltiplos valores selecionados usam correspondência OR.
- **Technology filter tag and version fact**: A tag canônica `Unity` agrupa a tecnologia no filtro independentemente de versão; uma versão específica, como Unity 6, é fato opcional separado e não cria uma segunda opção de filtro.
- **Project and employment periods**: Intervalos independentes que representam duração/fase de projeto, contribuição individual ou vínculo profissional, com fontes próprias.
- **Result summary**: Número de projetos que correspondem aos critérios atuais e total de projetos publicados sem filtros.
- **Expanded details**: Conteúdo adicional opcional de uma entrada, aberto junto a ela e vinculado à mesma identidade de projeto.
- **Contribution narrative**: Parágrafo de atuação individual, destaques técnicos opcionais e resultados/evidências opcionais, conforme conteúdo comprovado; organização editorial única não apaga a distinção factual entre produto, contribuição e funcionamento técnico.
- **Technical highlight**: Título específico e explicação de problema/mecanismo, com consequência apenas quando documentada; não equivale a atribuição automática de decisões ao autor.
- **Compact project facts**: Role, Context, Type e Period com significados distintos e campos ausentes omitidos; tecnologias mantêm dimensão própria.
- **Claim evidence**: Fonte canônica e limite de autoria/época que sustentam uma afirmação; rastreabilidade editorial interna não expõe documentação privada no catálogo.
- **Compact identity icon**: Derivative quadrado e otimizado associado ao registro central, compartilhado entre catálogo e Featured quando aplicável; decorativo quando redundante ao título e sujeito ao padrão de `docs/project-icon-standard.md`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No estado inicial, 100% dos projetos publicados (21 no conjunto atual) possuem entrada nomeada e reconhecível, independentemente de poster, hover, comportamento interativo opcional ou largura de tela.
- **SC-002**: Em 100% dos casos de uma matriz definida de busca (nomes completos/parciais, termos da contribuição, tecnologia, caixa e acentos), o conjunto de correspondências e o contador refletem exatamente os dados pesquisáveis.
- **SC-003**: Em 100% dos casos amostrados de facetas, correspondências seguem OR dentro de Context ou Technology e AND entre facetas e busca; limpar critérios restaura o total original.
- **SC-004**: O resumo de resultados sempre reporta a quantidade correspondente e o total não filtrado; estado vazio e restauração são alcançáveis por teclado e toque.
- **SC-005**: Todos os projetos continuam reconhecíveis e seus links essenciais operáveis mesmo quando o comportamento interativo opcional está indisponível; nenhum controle inoperante é apresentado como disponível.
- **SC-006**: Em avaliação manual de acessibilidade, 100% dos controles são nomeados e utilizáveis por teclado, foco visível, sem armadilha de foco e sem depender de hover; tecnologias assistivas recebem o estado de expansão e o resultado atualizado.
- **SC-007**: Em viewports móveis definidos para validação, nenhuma entrada ou controle se sobrepõe, perde conteúdo essencial ou força rolagem horizontal da página.
- **SC-008**: O cabeçalho segue o padrão da seção “More Projects” na Home, exibindo eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o mesmo texto de apoio; não exibe “PROJECT ARCHIVE” nem a apresentação anterior.
- **SC-009**: Em 100% das entradas, os chips de tecnologia não aparecem no resumo fechado; após expansão, todos os valores de tecnologia verificados daquele projeto aparecem nos detalhes e continuam pesquisáveis/filtráveis.
- **SC-010**: Em 100% dos projetos com mídia elegível, a entrada recolhida mostra a mídia principal inline no layout responsivo definido e expandir não duplica essa mídia. Todas as fontes pertencem à allowlist atual documentada em `evaluation.md` ou possuem documentação própria. A evidência distingue autorização de reutilização pelo usuário e comprovação independente de direitos.
- **SC-011**: Todas as fronteiras entre entradas do catálogo usam o mesmo tratamento de divisor e espaçamento definido pelo padrão de estilo.
- **SC-012**: Context e Technology permitem busca de opções e seleção múltipla independente; uma consulta digitada somente no campo interno de uma faceta não altera resultados nem contador de projetos.
- **SC-013**: Quando a busca de opções de uma faceta não encontra valores, o estado vazio aparece dentro daquele menu; os critérios de projeto e sua contagem permanecem inalterados.
- **SC-014**: “Search for”, “Context” e “Technology” são rótulos visíveis e posicionados acima dos respectivos campos/seletores.
- **SC-015**: Em todas as interações dos filtros, nunca há mais de um menu de faceta aberto; alternar entre eles preserva todas as seleções e resultados correntes.

- **SC-016**: Em todas as entradas com mídia principal aprovada, ela está disponível antes de expandir; desktop apresenta mídia à esquerda e identidade/descrição à direita, celular apresenta mídia acima, sem rolagem horizontal. Ícones aprovados seguem a referência anterior; entradas sem mídia ou ícone não reservam áreas vazias.
- **SC-017**: Em todas as entradas, contribuição, contexto, período, tipo de produto, tecnologias e CTAs disponíveis aparecem nos detalhes, não na entrada recolhida; nenhuma expansão repete a mídia principal ou o mesmo resumo sem conteúdo adicional.
- **SC-018**: Nos cenários de GIF distante, aproximação, carregamento lento, falha, movimento reduzido inicial/dinâmico e scripts indisponíveis, a alternativa estática correta permanece disponível até a animação estar pronta e autorizada a tocar; com detecção de proximidade, nenhum autoplay distante é solicitado antes da faixa existente. Sem esse recurso, preservar fallback de autoplay existente respeitando movimento reduzido. Nenhuma página apresenta Stop/Play ou controle equivalente, conforme decisão do usuário. Esse resultado não comprova conformidade completa do movimento automático contínuo.
- **SC-019**: Comparação do cabeçalho antes/depois confirma entrelinha de 24px, tipografia e espaçamentos aprovados preservados. Matriz de regressão de busca/facetas, contagem, deep links, quatro cases e expansão independente mantém os resultados anteriores.
- **SC-020**: Em 100% das entradas revisadas com contribuição comprovada, os detalhes apresentam Selected contributions com atuação individual identificável; não há três blocos obrigatórios separados Product/Contribution/Engineering focus. Entradas sem contribuição comprovada não exibem seção vazia ou autoria inferida.
- **SC-021**: Em revisão editorial de todas as entradas alteradas, cada afirmação de autoria, decisão, período e resultado corresponde a uma fonte e ao seu limite documentado; nenhuma métrica, CTA ou responsabilidade integral é acrescentada sem suporte. Afirmações idênticas sobre a mesma atuação não se repetem entre descrição, parágrafo e destaques sem acrescentar informação.
- **SC-022**: Todos os fatos disponíveis usam seus significados definidos em FR-035; Type não lista stack e Context não repete Role. Casos com dados ausentes, contribuição limitada, sem mídia/pôster/CTA/resultado permanecem legíveis sem campos ou grupos vazios.
- **SC-023**: Na matriz de regressão, termos representativos exclusivos dos destaques públicos encontram o projeto correto e atualizam a contagem; notas privadas e rascunhos não publicados não geram correspondência. Todos os quatro destinos de case e os deep links existentes continuam associados aos mesmos projetos.
- **SC-024**: Em desktop e celular, expandir mantém identidade/descrição e o controle associados ao projeto e apresenta detalhes abaixo da composição inicial, sem corte, sobreposição ou rolagem horizontal. Teclado, leitor de tela e ausência de scripts permitem acessar todo conteúdo adicional e os links. Cabeçalho e larguras de texto aprovados não sofrem alteração por este complemento.
- **SC-025**: A faceta Technology oferece exatamente uma opção `Unity` e nenhuma opção separada por versão. Todo projeto com tecnologia/engine Unity confirmada, incluindo Pathless, corresponde a essa tag; versões específicas só aparecem como fatos detalhados quando confirmadas e publicadas. Nenhum projeto ou versão é classificado por inferência de título ou prosa.
- **SC-026**: 100% dos cartões de projeto na área More Projects da Home exibem seus nomes sem hover ou foco; nome, link e layout permanecem utilizáveis com imagem, placeholder, falha/ausência de mídia, viewport estreito e ampliação.
- **SC-027**: A matriz de mídia registra para cada cenário executado viewport, preferência de movimento, condição de rede, momento dos pedidos e resultado observado. Com movimento reduzido ativo desde o início, zero preview GIF é solicitado; se a preferência mudar durante uma solicitação, o fallback permanece e a animação não é revelada. Nenhuma página apresenta controle Stop/Play. Casos não executados ficam explicitamente pendentes.
- **SC-028**: A matriz de acesso cobre teclado, foco, leitor de tela, estados dos filtros/disclosures, perda de foco por filtro, Escape quando aplicável, ausência de JavaScript e viewport de 320px; cada rota inspecionada expõe um único landmark principal, e resultados são marcados como aprovados somente após execução. Teste manual de zoom foi removido do escopo por decisão do usuário em 2026-10-07.
- **SC-029**: 100% das diferenças de período ou escopo encontradas entre o registro central, catálogo, case existente e Experience são classificadas como coerentes com fontes, corrigidas pela especificação de origem/período adequado ou mantidas como pendência explícita. Nenhuma divergência é apagada por normalização silenciosa.
- **SC-030**: Os registros Ello 2.0, Read With Ello e Wallace’s Quest são comparados com o contexto de Experience e seus cases existentes; o vínculo de emprego da Ello é distinguido dos períodos de projeto, tecnologias/escopos seguem fontes e fases de Wallace são preservadas quando documentadas.
- **SC-031**: A validação de navegação e carregamento cobre fonte lenta/falha, retorno a posição salva, conteúdo antes/depois da inicialização, media bloqueada e decode com falha; não há tela vazia persistente ou flash de posição incorreta nos cenários realmente executados. Inspeção de código sem runtime não conta como aprovação.
- **SC-032**: Para 100% dos registros que optarem por ícone de identidade aprovado, a referência canônica aponta para asset WebP quadrado de 104 × 104 px, reutilizado no catálogo e Featured quando aplicável, e renderiza a 52 × 52 CSS px sem corte ou deslocamento óptico perceptível nos viewports verificados. A inspeção confirma que a fonte original permanece intacta, arte corporativa preserva sua identidade, ícone ausente não reserva espaço e o título permanece acessível sem anúncio redundante. Resultados registram rota, viewport e método.
- **SC-033**: Em 100% das entradas do catálogo, clicar ou tocar no ícone quando presente e em qualquer parte do título dentro de `archive-record__identity-link` navega ao mesmo fragmento estável do registro. O link tem foco de teclado visível e nome acessível pelo título; conteúdo fora da identidade não é absorvido pelo link, não há link aninhado e layout desktop/mobile não sofre overflow. Validar mouse, teclado e touch em rota/viewports registrados.

## Assumptions

- O arquivo atual contém 21 registros publicados; o total exibido deve acompanhar o catálogo real após inclusões ou remoções futuras, em vez de permanecer fixo em 21.
- Context e Technology são as duas facetas iniciais. A taxonomia Context deriva de classificação confirmada (por exemplo, profissional, independente, estudo); “game/software/product” descreve tipo e não é misturado à faceta Context.
- Os agrupamentos editoriais existentes podem ser ajustados para não classificar incorretamente um produto por sua tecnologia, desde que a ordem geral e as entradas permaneçam reconhecíveis.
- A lista inicial usa uma ordem editorial estável existente; busca e facetas filtram essa ordem sem ordenar por relevância, popularidade ou métricas de visitante.
- Resumos exibem apenas fatos presentes nas fontes atuais de conteúdo. Ausência de contribuição, stack ou período confirmados não será preenchida por inferência.
- Miniaturas são complementares, e conteúdo profundo fica expandido sob demanda junto à respectiva entrada.
- Chips/tags que identificam tecnologia permanecem disponíveis para busca/filtros e dentro de More details, mas não aparecem no resumo compacto de cada projeto.
- O texto, título e composição do cabeçalho da página de catálogo acompanham a seção “More Projects” da Home; “All Projects” identifica a rota completa alcançada pelo link homônimo.
- Os rótulos Search for, Context e Technology aparecem acima de seus respectivos controles; a interação das facetas mantém no máximo um menu aberto e preserva seleções ao alternar.
- Mídia principal verificada aparece à esquerda da identidade/descrição da entrada recolhida no desktop e acima delas no celular; detalhes adicionais ficam junto à entrada. Esta decisão substitui a localização anterior da mídia apenas nos detalhes, preservada como histórico na seção Clarifications. A revisão visual continua necessária conforme a constituição.
- A feature não cria novos estudos de caso, conteúdo biográfico, claims de impacto, mídia, autorização de uso ou integração de analytics.
- A feature não inclui estudo de usabilidade com participantes nem comparação antes/depois; a validação desta etapa usa os critérios funcionais, editoriais, de acessibilidade, responsividade e consistência SC-001–SC-031. O método de comparação com participantes em docs/projects-catalog-hiring-review.md permanece pesquisa futura, não gate de implementação nem promessa de ganho de contratação.
- Esta feature agora ocupa o número 006. A hipótese anterior de ficha única e faixa horizontal foi substituída pelo catálogo compacto com busca, filtros e detalhes expansíveis descrito nesta spec.
- Os resultados da auditoria independente e as decisões atuais do inventário foram consultados para fundamentar a abordagem. O registro mais antigo do inventário que recomenda navegação por âncoras sem filtros antecede este pedido explícito de busca e facetas; este escopo mais recente prevalece para esta feature, sem reescrever o histórico.
- A tag canônica `Unity` é a única opção Unity na faceta, independentemente da versão. Um fato exato confirmado (por exemplo, Unity 6) pode continuar nos detalhes sem se tornar uma tag/opção separada.
- O nome visível permanente é requisito para cartões de projeto da Home em More Projects; os projetos em destaque que já exibem título permanecem no tratamento atual.
- Os períodos centralizados por projeto e os intervalos da experiência profissional podem divergir porque representam entidades/períodos diferentes; divergência não é erro até que as fontes a demonstrem.
- A feature não inclui estudo de usabilidade com participantes nem promete aumento de contratação. Resultados de implementação, runtime, acessibilidade e performance serão registrados depois de executados, nunca inferidos da spec.
- Qualquer atualização de dados ou componente compartilhado será limitada aos requisitos desta feature e preservará outras áreas não explicitamente abrangidas, inclusive a ordem dos projetos em destaque.


## Complemento de apresentação — 2026-10-05

**Registro histórico:** esta seção documenta inspeções e decisões anteriores. Para a hierarquia editorial, o complemento Selected contributions ao final e FR-020/FR-026/FR-032–FR-037 prevalecem. Referências a lista de mídia vazia, Project details ou mídia de 220px descrevem estados anteriores, não a configuração atual; a largura aprovada posteriormente é 300px. A confirmação posterior de reaproveitamento e a remoção de Stop/Play continuam válidas. Esta revisão editorial não reabre essas decisões nem declara concluída sua validação histórica.

Este pedido integra a feature 006 e prevalece sobre os requisitos anteriores de localização da mídia e de metadados na entrada recolhida. As respostas anteriores em Clarifications são registro histórico; a permissão de várias entradas expandidas continua válida, distinta da regra de um único menu de faceta aberto.

### Referências inspecionadas

- Commit `6679f07`, `src/components/RichProjectRecord.astro`: identidade com pôster de 52×52 antes do título, imagem decorativa, carregamento lazy e decodificação assíncrona. O estilo existente define borda, raio de 10px e distância de 14px.
- Commit `b0daafa` e contrato `specs/003-media-fallbacks/contracts/media-preview.md`: autoplay adiado até aproximação; fallback WebP do primeiro frame até carga/decodificação completa; falhas e movimento reduzido preservam a imagem. A referência de aproximação é 75% da altura da janela em ambos os sentidos; interação existente pode solicitar preview diretamente. Na ausência do mecanismo de detecção de proximidade, o comportamento existente permite autoplay; ausência de scripts conserva o fallback.
- `src/components/ProjectMediaPreview.astro` atual conserva esses mecanismos e acrescenta controles de parar/reproduzir. Interromper restaura a imagem estática; não pressupor congelamento de frame do GIF, nem descarregamento ao sair da área visível (não são comportamentos existentes).
- `src/data/projects.ts` distingue `identityImage` (ícone/pôster de identidade) e fontes da mídia/fallback. Essas imagens têm funções distintas e podem coexistir, conforme solicitado.
- `src/pages/projects/index.astro` mantém atualmente a lista de mídias aprovadas vazia. A presença de um asset ou de uma implementação anterior não comprova autorização/provenance. A nova apresentação não autoriza preencher essa lista sem evidência canônica nem mostrar mídia indiscriminadamente.

### Conflitos e limites para o próximo planejamento

- A clarificação histórica sobre mídia ao lado dos detalhes foi substituída por mídia na entrada recolhida; FR-002, FR-017, FR-019, FR-020 e SC-010 foram alinhados.
- `plan.md`, `contracts/projects-catalog.md`, `data-model.md`, `research.md`, `quickstart.md` e o complemento T048–T063 de `tasks.md` foram alinhados a esta revisão em 2026-10-05. Tarefas e evidências anteriores permanecem como histórico e não comprovam os requisitos novos; a implementação e sua validação continuam pendentes.
- Uma entrada usa a primeira mídia principal aprovada na ordem editorial existente; demais mídias aprovadas são complementares nos detalhes. Uma mídia animada sem alternativa estática válida não é elegível para apresentação automática.
- Não foram criados assets, dados, autorização, código, nova spec ou branch. Não há ambiguidade de apresentação que exija nova decisão neste pedido; elegibilidade de cada mídia continua condicionada à documentação.

### Confirmação de reaproveitamento — 2026-10-05

O usuário confirmou nesta conversa o reaproveitamento dos pôsteres de identidade e GIFs que já eram apresentados nesta branch antes do catálogo. Para este complemento, essa confirmação autoriza reutilizar exclusivamente as mesmas fontes existentes de Ello Learn, Read With Ello, Pathless e Wallace’s Quest, verificadas no histórico 6679f07 e nos dados atuais, mantendo fallback/enquadramento/autoplay. Não representa aprovação de mídia nova nem comprovação adicional de direitos de terceiros; a decisão e os paths são registrados em evaluation.md. A exigência anterior de aguardar nova documentação para esse conjunto é substituída pela confirmação explícita de reutilização do usuário. Novas fontes continuam sujeitas ao gate documental.

### Ajuste visual solicitado — 2026-10-05

**Registro histórico, substituído em 2026-10-05:** por instrução explícita do usuário, retirar Stop/Play do catálogo, mantendo então os controles nos demais usos. Uma decisão global posterior removeu esses controles de todas as páginas; ver FR-014, FR-028 e SC-018. A decisão atual mantém autoplay configurado, fallback e movimento reduzido, sem afirmar conformidade completa. O restante desta anotação descreve dimensões e espaçamentos de uma versão anterior.

### Detalhes abaixo da composição inicial — 2026-10-05

Por revisão do usuário, o controle passa a More details (+ recolhido, − expandido). A composição inicial conserva mídia na coluna 1 e pôster/título/descrição na coluna 2. O disclosure ocupa uma segunda linha completa abaixo de ambas, e seus dados adicionais não ficam limitados à coluna 2. Expansão nativa independente, teclado e comportamento sem scripts preservados. Esta revisão complementa a mesma feature.

## Complemento editorial — Selected contributions — 2026-10-05

### Decisões de especificação e limites

- O pedido atual especifica fatos compactos, Selected contributions, tecnologias/metadados úteis e ações; substitui a obrigação de apresentar Product, Contribution e Engineering focus como blocos separados. O registro da hipótese anterior permanece como histórico, sem autorizar repetição na apresentação nova.
- O rótulo é Selected contributions. Dois ou três destaques são o alvo quando há evidência suficiente, não uma quota: um destaque ou apenas parágrafo são válidos em registros limitados. Resultados são opcionais.
- Descrição recolhida explica o produto; o conteúdo adicional de produto permanece apenas quando necessário para compreender a contribuição. A seleção e revisão editorial não se resumem a extrair a primeira frase ou concatenar campos anteriores.
- A composição inicial, largura de mídia aprovada de 300px, altura flexível, posição do controle, segunda linha de detalhes, largura disponível do texto e cabeçalho aprovado permanecem. Não criar schema ou solução de componente nesta etapa.
- Reorganização visual não apaga os conceitos factuais de produto, atuação e engenharia. A revisão deve preservar rastreabilidade interna e limitar alterações públicas a /projects/, sem modificar conteúdo compartilhado da Home/cases inadvertidamente.
- A spec permanece Draft. Checklist documental não comprova aprovação de exemplos, conteúdo publicado, implementação ou resultado de contratação. Não há ambiguidade de apresentação pendente que exija nova pergunta neste pedido.

### Fontes consultadas e prioridade factual

- [Estudo local](../../docs/projects-catalog-hiring-review.md), `src/components/ProjectRecord.astro`, `src/data/projects.ts`, estilos atuais, constituição e registros `docs/stage-10-content-register.md` / `docs/repository-evidence-pass.md`.
- [Portfólio — Site pessoal](https://app.notion.com/p/3e5761878dbd81be92a1f751cbe38702): apresentação pública curada, atuação explícita, desafio/implementação/evidência, sem publicar o workspace inteiro. Sua proibição antiga de uma página Archive é anterior ao pedido de /projects/ e não substitui o escopo atual.
- [Portfolio Project Inventory](https://app.notion.com/p/3e5761878dbd81789220e79c8143bffb): densidade proporcional à evidência, cases preservados e referências às fontes por projeto. Agrupamentos e decisões antigas de navegação não prevalecem sobre busca/facetas desta feature.
- [Pathless — Project Source of Truth](https://app.notion.com/p/3e8761878dbd8175af5dc8691940b02c): atuação comprovada em scanner/HUD, assistência e integração de missão; baseline de calamidade e montagem de cena possuem limites de colaboração. Parte da evidência é posterior ao prazo; não afirmar que tudo estava no binário submetido. Esta fonte atualiza a antiga pendência de ownership no registro local de Stage 10.
- [Ello 2.0 — Project Source of Truth](https://app.notion.com/p/3e9761878dbd81f7b009cf2af87e9370): trabalho Flutter/Python de Sep–Nov 2025, distinto de Read With Ello; não atribuir ML/speech, toda plataforma/backend ou release ownership. Atualiza a classificação antiga de continuação não distinta no registro local de auditoria.
- [Read With Ello — Project Source of Truth](https://app.notion.com/p/3e9761878dbd810fb178c40c91cf724d): contribuição Unity/client; relação entre história versionada e release público permanece qualificada, sem autoria de backend ou speech.
- [Wallace’s Quest — Project Source of Truth](https://app.notion.com/p/3ea761878dbd817d8375cf872af8114a): distinguir combate de 2020, módulos de 2021 e revisita/migração de 2026; não afirmar combate atual utilizável, optimalidade de A* ou performance medida. O período atual no catálogo não representa automaticamente todo esse histórico.
- Fontes canônicas recentes por projeto prevalecem para suas afirmações sobre notas gerais/históricas. A confirmação de reutilização de mídia pelo usuário permanece registrada, mas não vira comprovação de direitos: Wallace restringe republicação de mídia composta, e as fontes de Ello registram permissões ainda não resolvidas. Este complemento não adiciona nem reautoriza mídias, mantendo explícita a distinção entre configuração aprovada e comprovação factual/documental.

### Conflitos para o próximo planejamento

**Registro histórico da especificação:** a tabela abaixo registra pendências identificadas antes do planejamento. Na rodada seguinte de plan/clarify/tasks, os artefatos foram alinhados; T064–T065 concluídas, T066–T078 pendentes. A tabela não representa o estado atual desses documentos. Implementação/conteúdo público/evidências novas ainda não foram produzidos.

| Artefato | Divergência/pêndencia | Alinhamento necessário |
| --- | --- | --- |
| `plan.md` | Resumo e hierarquia ainda citam Project details e grupos separados de engenharia/contribuição. | Incorporar More details, fatos compactos e narrativa única com destaques opcionais, preservando composição e fallback sem scripts. |
| `tasks.md` | T031/T051 e conclusões anteriores descrevem implementação da apresentação anterior. | Preservar tarefas e evidências históricas; acrescentar trabalho e validação deste complemento sem considerar os requisitos novos cumpridos. |
| `data-model.md` | detailGroups/detailContent mantêm grupos separados e não definem narrativa/destaques nem semântica compacta revisada. | Planejar representação editorial e rastreabilidade, sem mistura de dimensões ou perda de indexação pública. |
| `contracts/projects-catalog.md` | Contrato de detalhes mantém Product/contribution/engineering focus como grupos. | Definir nova hierarquia, estados de ausência e preservação da busca, links e expansão. |
| `research.md` | Decisão anterior de hierarquia/mídia não reflete todo o estado atual. | Incorporar estudo local e fontes canônicas, distinguindo recomendações, decisões e histórico. |
| `quickstart.md` / `evaluation.md` | Evidências existentes não verificam a nova narrativa, metadados ou indexação dos destaques. | Planejar revisão editorial e regressão responsiva/acessível; não converter estudo futuro com participantes em gate. |
| Conteúdo atual | Corte automático de product; contexto/função/stack misturados em fatos; três grupos visíveis. Fontes atuais podem qualificar períodos e claims. | Revisar por projeto com fonte canônica antes da publicação; preservar fatos úteis sem inferir autoria ou resultados. |

Os artefatos acima não foram replanejados nesta etapa. A atualização fica limitada à spec existente e ao checklist documental; não altera código, assets, fichas publicadas, Notion, branch ou feature.

## Complemento da avaliação — prioridades 2–5 — 2026-10-05

Este complemento pertence à feature 006 e atualiza os requisitos vigentes acima. Requisitos atuais e esta seção prevalecem sobre limites de escopo, cenários e pressupostos históricos que restringiam mudanças a `/projects/` ou tratavam tecnologia, Home e validação de mídia de outra forma. Não implementa as recomendações nem aprova conteúdo público.

### Evidências inspecionadas e estado observado

| Ponto | Evidência local observada | Resultado documental |
| --- | --- | --- |
| Unity / Unity 6 | `src/data/projects.ts` preserva Pathless como Unity 6; `src/pages/projects/index.astro` filtra valores confirmados por igualdade exata; `docs/project-records.md` registra Unity e Unity 6 separados. | Decisão atual: a faceta tem uma única tag canônica `Unity`; a versão factual pode permanecer separada nos detalhes, sem criar opção de filtro. |
| Nome nos cartões da Home | `src/components/SupportingProject.astro` dá a variante `simple` um título `sr-only`; `src/components/FeaturedProject.astro` já exibe o título. | US6/FR-039/SC-026 limitam a mudança aos cartões More Projects cuja identificação textual está ausente; não reordenam Selected work. |
| Mídia e acessibilidade | `ProjectMediaPreview.astro` contém faixa de carregamento próxima, fallback, decode, falha, hover/foco configurados e resposta a movimento reduzido. O componente atual não mostra Stop/Play. `BaseLayout.astro` aguarda DOM/fontes e tem liberação de segurança em 4s; `/projects/` insere outro `<main>` dentro do landmark `<main>` de BaseLayout. Os menus de faceta usam disclosures e checkboxes, não um combobox ARIA tradicional. | FR-040–FR-043 e SC-027/SC-028/SC-031 definem cenários reais para validar carregamento, navegação, semântica e estado. Inspeção de fonte não equivale à execução da matriz ou a uma auditoria WCAG completa. |
| Períodos e escopo | Ello 2.0 está em Sep–Nov 2025, enquanto Experience para Ello é Oct 2022–Dec 2025; Ello 2.0 não tem `caseStudy` publicado no registro atual. Read With Ello registra Oct 2022–Aug 2025. Wallace registra 2020–2021/revisitado em 2026 e tem marcos de case específicos. Cases são aninhados em `caseStudy` nos registros centrais; não foi encontrado `src/data/cases.ts`. | US7/FR-044/SC-029–SC-030 separam período de projeto, fases e vínculo profissional, evitam exigir destinos ausentes e preservam desacordo sem fonte conclusiva. |

### Conflitos e pendências para a etapa posterior

- `plan.md`, `tasks.md`, `contracts/projects-catalog.md`, `data-model.md`, `research.md`, `quickstart.md`, `evaluation.md` e o checklist existente ainda refletem, em graus diferentes, o escopo ou a taxonomia anteriores. Devem ser avaliados numa etapa posterior de plan/tasks/analyze; esta rodada atualiza somente spec e checklist de qualidade exigido pelo Specify.
- `docs/repository-evidence-pass.md` contém uma classificação antiga de Ello 2.0 como possível continuação de Read With Ello, enquanto o registro e os dados atuais o tratam como projeto distinto. A classificação deve seguir as fontes canônicas recentes, mantendo a nota histórica e evitando duplicar claims entre os projetos.
- A análise estática encontrou o landmark `<main>` aninhado em `/projects/`; a spec exige validar/corrigir o comportamento semântico, mas nenhum teste de navegador, teclado ou leitor de tela foi executado nesta etapa.
- A revisão do comportamento de fontes, carregamento, retorno à posição salva, movimento reduzido, mídia bloqueada e falhas exige execução posterior em runtime. Nenhum resultado de acessibilidade, desempenho ou carregamento foi marcado como aprovado por esta inspeção.
- A ordem de Featured/Selected work e o restante do design da Home permanecem fora do escopo. Não há decisão de criar estudo de caso para Ello 2.0.

Nenhuma ambiguidade crítica restante requer pergunta antes do planejamento: as regras de descoberta e escopo estão definidas; divergências factuais são tratadas como pendências rastreáveis, não como fatos a uniformizar.

### Reutilização dirigida das mídias de Pandora — 2026-10-07

O usuário solicitou completar a entrada de Pandora e indicou que as mídias do jogo já estavam em `public/projects/pandora/`. Para esse escopo, a instrução autoriza exibir no catálogo os arquivos exatos já registrados: `pandora-poster.webp`, `pandora-gameplay-preview.gif` e o fallback derivado `pandora-first-frame.webp`. Essa autorização editorial de uso no portfólio não resolve a questão separada do relatório sobre direitos/licenças de terceiros; não a descrever como verificação independente. Os caminhos, dimensões observadas e limite estão em `evaluation.md`.

### Decisão posterior — tag Unity única — 2026-10-05

O usuário escolheu padronizar a faceta para exibir somente `Unity`, sem opções por versão. Isso substitui a proposta anterior de mapear uma família para versões descendentes na lista de opções. Registros com versão Unity confirmada recebem a tag canônica Unity; fatos específicos como Unity 6 permanecem separados e opcionais nos detalhes, quando publicados. Não renomear o registro-fonte nem inferir tags por texto livre.


## Extensão — ícones compactos de identidade — 2026-10-08

A identidade visual pequena usa o contrato permanente em `docs/project-icon-standard.md`: derivação quadrada 104 × 104 WebP para slot 52 × 52 CSS px, crop opticamente centrado e asset canônico compartilhado por catálogo e Featured. Preserve pôsteres originais e designs de produtos corporativos; não exija ícone de toda entrada. Sem aprovação, omita sem coluna vazia. A extensão documenta os seis ícones revisados e não comprova direitos de terceiros.


## Extensão — link da identidade do projeto — 2026-10-08

O alvo interativo cobre toda a composição visual de `archive-record__identity-link` (ícone e título) em `ProjectRecord.astro`, com ou sem mídia, e não somente os caracteres do título. Mantém o destino `#${recordId}` e o id estável do registro. Mídia, resumo, disclosure e links de detalhes continuam fora da área. Semântica: link único, sem aninhamento; título como nome acessível e ícone decorativo. O comportamento em runtime deve ser conferido segundo SC-033.
