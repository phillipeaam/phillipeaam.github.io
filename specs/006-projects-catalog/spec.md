# Feature Specification: Projects Catalog Discovery

**Feature Branch**: `[006-projects-catalog]`
**Created**: 2026-10-04
**Status**: Draft
**Input**: Redesenhar `/projects/` como catálogo compacto pesquisável, com cabeçalho no padrão da Home, busca/facetas rotuladas, no máximo um menu de filtro aberto por vez, contador e detalhes expansíveis junto a cada projeto. Todos os projetos devem ser reconhecíveis sem depender de miniaturas, hover ou rolagem horizontal.

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

Como visitante, quero ver os projetos disponíveis em uma lista compacta, reconhecível e organizada, para escolher o que vale aprofundar sem ler 19 fichas longas em sequência.

**Why this priority**: A descoberta do conjunto é o problema principal. O catálogo deve continuar útil mesmo que a pessoa não use busca, filtros, imagens ou comportamento interativo opcional.

**Independent Test**: Abrir `/projects/` em desktop e celular e verificar se todos os resultados têm nome e resumo identificáveis, se grupos sem resultados não confundem e se nenhum projeto depende de poster ou hover para ser reconhecido.

**Acceptance Scenarios**:

1. **Given** o arquivo contém projetos com e sem mídia, **When** a pessoa abre a página, **Then** encontra uma entrada textual reconhecível para cada projeto publicado.
2. **Given** um projeto tem fatos de contexto, contribuição ou período verificados, **When** a pessoa percorre sua entrada, **Then** esses sinais aparecem de forma compacta sem atribuir fatos ausentes; tecnologias e tags ficam nos detalhes expandidos.
3. **Given** a pessoa abre a página em viewport estreito, **When** percorre os resultados, **Then** consegue ler cada entrada sem rolagem horizontal da página e sem depender de hover.
4. **Given** a pessoa abre a página, **When** compara o cabeçalho e as entradas com a Home, **Then** vê a composição aprovada da seção “More Projects”, com título “All Projects”, chips de tecnologia apenas nos detalhes expandidos e divisores uniformes.

### User Story 2 - Encontrar projetos por texto e facetas (Priority: P1)

Como recrutador ou profissional da indústria, quero pesquisar palavras presentes nas fichas e combinar contexto profissional com tecnologia, para localizar projetos relevantes ao meu interesse.

**Why this priority**: Os 19 projetos cobrem produtos, jogos e estudos diversos. Busca e facetas permitem chegar a um subconjunto sem esconder o conjunto completo quando os controles não são usados.

**Independent Test**: Aplicar uma matriz de consultas, valores de contexto e tecnologias; comparar os nomes e o contador resultantes com os dados públicos de origem.

**Acceptance Scenarios**:

1. **Given** nenhuma busca ou faceta está selecionada, **When** a página é aberta, **Then** o resumo informa que os 19 projetos atuais estão disponíveis.
2. **Given** uma consulta corresponde ao nome, resumo, contribuição ou metadados públicos de projetos, **When** a pessoa pesquisa, **Then** somente as entradas correspondentes permanecem na lista e o contador atualiza.
3. **Given** mais de um valor está selecionado dentro de Context ou Technology, **When** os resultados são calculados, **Then** basta corresponder a um dos valores daquela faceta.
4. **Given** há busca e valores em ambas as facetas, **When** os resultados são calculados, **Then** cada projeto corresponde à busca, a pelo menos um Context selecionado e a pelo menos uma Technology selecionada.
5. **Given** uma combinação não corresponde a nenhum projeto, **When** a pessoa vê os resultados, **Then** recebe uma mensagem clara e uma ação para limpar os critérios.
6. **Given** a pessoa abre Context ou Technology, **When** pesquisa opções e seleciona mais de um valor, **Then** cada menu reduz somente suas próprias opções por texto e mantém as escolhas múltiplas independentes.
7. **Given** um menu de faceta está aberto, **When** a pessoa abre o outro, **Then** o primeiro menu fecha, o segundo abre e os valores selecionados no primeiro permanecem ativos.

### User Story 3 - Aprofundar um projeto e seguir seus links (Priority: P2)

Como visitante, quero expandir uma entrada no próprio lugar para ler detalhes e abrir cases ou fontes disponíveis, sem perder meu contexto no catálogo.

**Why this priority**: Resumos dão visão comparável; detalhes sob demanda preservam as histórias técnicas e reduzem leitura obrigatória.

**Independent Test**: Abrir e recolher entradas representativas com e sem case, mídia, CTA ou detalhes adicionais; verificar associação correta de fatos e links e preservar posição/foco.

**Acceptance Scenarios**:

1. **Given** uma entrada possui detalhes públicos adicionais, **When** a pessoa ativa “Show project details”, **Then** os detalhes daquele mesmo projeto são exibidos junto à entrada.
2. **Given** uma entrada possui um estudo de caso, **When** a pessoa escolhe o link, **Then** chega ao case correspondente; o link mantém nome acessível e destino correto.
3. **Given** uma entrada não possui mídia, detalhes expansíveis ou ação externa válida, **When** é apresentada, **Then** não mostra controles vazios nem promete conteúdo indisponível.
4. **Given** uma pessoa abre um deep link existente de projeto, **When** a página carrega, **Then** o item correspondente continua localizável mesmo se a organização visual do arquivo mudar.
5. **Given** os detalhes de um projeto estão abertos, **When** a pessoa expande outro projeto, **Then** ambos permanecem abertos e podem ser recolhidos independentemente.
6. **Given** um projeto tem mídia aprovada por evidência, **When** a pessoa abre seus detalhes, **Then** a mídia aparece inline ao lado do conteúdo no desktop e acima dele no celular, com alternativa estática e controles de movimento aplicáveis.

### User Story 4 - Usar navegação acessível e conteúdo essencial sem scripts (Priority: P1)

Como pessoa que navega por teclado, leitor de tela, toque ou com movimento reduzido, quero acessar controles e conteúdo sem depender de uma modalidade de interação específica.

**Why this priority**: Descoberta que não funciona para diferentes modos de navegação exclui visitantes do caminho principal.

**Independent Test**: Percorrer controles/resultados por teclado e leitor de tela, testar redução de movimento e conferir o catálogo legível quando comportamentos interativos opcionais não estiverem disponíveis.

**Acceptance Scenarios**:

1. **Given** a pessoa usa somente teclado, **When** navega, filtra e expande um item, **Then** a ordem de foco é previsível, o foco visível e nenhum controle prende a navegação.
2. **Given** uma pessoa usa tecnologia assistiva, **When** interage com filtros, contador e detalhe, **Then** rótulos, estado e mudanças relevantes são comunicados sem mover foco inesperadamente.
3. **Given** a preferência de redução de movimento está ativa, **When** a pessoa vê o catálogo ou abre detalhes, **Then** animação não é necessária para entender ou operar o conteúdo.
4. **Given** comportamentos interativos opcionais não estão disponíveis, **When** a pessoa abre a página, **Then** entradas, conteúdo essencial e links continuam disponíveis em forma legível.

### Edge Cases

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

- **FR-001**: A página MUST apresentar uma entrada identificável para cada projeto publicado no arquivo, atualmente 19, sem exigir seleção por miniatura ou rolagem horizontal.
- **FR-002**: Cada entrada MUST apresentar nome e resumo conciso do produto; contexto e contribuição MUST aparecer quando houver informação pública verificada. Período MUST aparecer somente quando disponível e confirmado. Os chips/tags de tecnologia MUST ficar nos detalhes expandidos, e não na entrada compacta.
- **FR-003**: O arquivo MAY preservar agrupamentos editoriais úteis, mas MUST manter contexto profissional, tipo de produto e tecnologias como dimensões distintas e não induzir classificação incorreta.
- **FR-004**: A pessoa MUST poder pesquisar por nome, descrição do produto, contribuição e metadados públicos apresentados no arquivo, incluindo tecnologias e contexto.
- **FR-005**: A busca MUST ignorar caixa, espaços no início/fim e diferença entre letras acentuadas e não acentuadas; MUST atualizar quais entradas correspondem à consulta.
- **FR-006**: A pessoa MUST poder filtrar por Context e Technology em menus de seleção separados, com busca e seleção de múltiplos valores. Valores disponíveis MUST vir dos dados verificados dos projetos; etiquetas não podem ser inferidas apenas por semelhança de nome.
- **FR-007**: Sem seleção em uma faceta, essa faceta não restringe resultados. Múltiplos valores na mesma faceta MUST usar OR; busca e facetas distintas MUST combinar por AND.
- **FR-008**: A página MUST exibir número de projetos correspondentes e total não filtrado, por exemplo “Showing 4 of 19 projects”; a contagem MUST corresponder a todas as entradas do resultado, não somente às que cabem no viewport.
- **FR-009**: A pessoa MUST poder remover valores selecionados e limpar todos os filtros e a consulta em uma ação identificável.
- **FR-010**: Um conjunto sem correspondências MUST exibir estado vazio compreensível e ação para limpar critérios sem ocultar a consulta e os filtros atuais.
- **FR-011**: Cada entrada com detalhes adicionais MUST permitir expansão e recolhimento independentes no próprio contexto do item; várias entradas podem permanecer expandidas simultaneamente e seu estado aberto/fechado deve ser comunicado. Busca/filtragem não pode apresentar detalhes pertencentes a uma entrada que deixou de corresponder.
- **FR-012**: Links para os quatro estudos de caso existentes, ações externas válidas e identificadores de deep link MUST permanecer associados ao projeto correto. Destinos ausentes não podem gerar CTA vazio ou enganoso.
- **FR-013**: A ausência de poster ou de autorização/provenance de mídia não pode impedir reconhecimento textual do projeto nem levar à apresentação de placeholder como evidência real.
- **FR-014**: Mídia animada MUST manter alternativa estática precisa, respeitar preferência de redução de movimento e oferecer controle acessível de pausa/parada quando movimento automático contínuo estiver presente.
- **FR-015**: Os controles MUST ter rótulos, semântica e estado acessíveis; operações MUST funcionar por teclado e toque, com foco visível e sem dependência de hover.
- **FR-016**: O conteúdo essencial e links MUST permanecer legíveis e utilizáveis quando comportamentos interativos opcionais não estão disponíveis; controles sem comportamento funcional MUST não ser apresentados como ativos.
- **FR-017**: Em larguras móveis, entradas, controles e detalhes com mídia MUST adaptar-se sem sobreposição, perda de conteúdo essencial ou rolagem horizontal da página; mídia aprovada fica acima do texto dos detalhes.
- **FR-018**: A página MUST preservar a identidade visual editorial já estabelecida e limitar mudanças à experiência de /projects/ e às áreas diretamente necessárias para ela.
- **FR-019**: Quando o inventário fornecer mídia com origem e autorização verificadas, Project details MUST exibi-la inline junto à ficha; mídia sem essa documentação MUST permanecer oculta até ser validada.
- **FR-020**: Detalhes expandidos MUST organizar contribuição, foco de engenharia, contexto, metadados confirmados, tecnologias, mídia aprovada e links disponíveis com hierarquia visual consistente; grupos sem conteúdo MUST ser omitidos.
- **FR-021**: Entradas do catálogo MUST usar divisores consistentes em espessura, cor, espaçamento e continuidade, sem variação visual involuntária entre projetos.
- **FR-022**: O cabeçalho de `/projects/` MUST reutilizar o padrão aprovado da seção “More Projects” na Home, com eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o mesmo texto de apoio. MUST omitir o rótulo “PROJECT ARCHIVE” e a apresentação anterior.
- **FR-023**: A busca dentro de um menu de faceta MUST limitar apenas as opções visíveis naquele menu até que a pessoa selecione/desmarque valores; o texto digitado no menu não pode, sozinho, filtrar projetos nem alterar o contador de projetos.
- **FR-024**: O campo de busca MUST ter o rótulo visível “Search for”; as facetas MUST ter rótulos visíveis “Context” e “Technology” acima de seus respectivos controles de seleção.
- **FR-025**: No máximo um menu de faceta pode estar aberto por vez. Abrir um menu MUST fechar o outro sem limpar, alterar ou perder valores selecionados nele; ativar novamente o menu aberto MUST recolhê-lo.

### Key Entities *(include if feature involves data)*

- **Project entry**: Nome, resumo do produto, contexto profissional/independente/estudo, contribuição, período, tecnologias verificadas, grupo editorial, mídia, case/destinos e identificador estável, conforme campos existentes.
- **Search query**: Texto inserido pela pessoa, aplicado às informações públicas pesquisáveis de cada projeto.
- **Context facet**: Contexto de trabalho de um projeto, separado de sua tecnologia e da natureza do produto.
- **Technology facet**: Tecnologia confirmada associada ao projeto; múltiplos valores selecionados usam correspondência OR.
- **Result summary**: Número de projetos que correspondem aos critérios atuais e total de projetos publicados sem filtros.
- **Expanded details**: Conteúdo adicional opcional de uma entrada, aberto junto a ela e vinculado à mesma identidade de projeto.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No estado inicial, 100% dos projetos publicados (19 no conjunto atual) possuem entrada nomeada e reconhecível, independentemente de poster, hover, comportamento interativo opcional ou largura de tela.
- **SC-002**: Em 100% dos casos de uma matriz definida de busca (nomes completos/parciais, termos da contribuição, tecnologia, caixa e acentos), o conjunto de correspondências e o contador refletem exatamente os dados pesquisáveis.
- **SC-003**: Em 100% dos casos amostrados de facetas, correspondências seguem OR dentro de Context ou Technology e AND entre facetas e busca; limpar critérios restaura o total original.
- **SC-004**: O resumo de resultados sempre reporta a quantidade correspondente e o total não filtrado; estado vazio e restauração são alcançáveis por teclado e toque.
- **SC-005**: Todos os projetos continuam reconhecíveis e seus links essenciais operáveis mesmo quando o comportamento interativo opcional está indisponível; nenhum controle inoperante é apresentado como disponível.
- **SC-006**: Em avaliação manual de acessibilidade, 100% dos controles são nomeados e utilizáveis por teclado, foco visível, sem armadilha de foco e sem depender de hover; tecnologias assistivas recebem o estado de expansão e o resultado atualizado.
- **SC-007**: Em viewports móveis definidos para validação, nenhuma entrada ou controle se sobrepõe, perde conteúdo essencial ou força rolagem horizontal da página.
- **SC-008**: O cabeçalho segue o padrão da seção “More Projects” na Home, exibindo eyebrow “BREADTH, AT A GLANCE”, título “All Projects” e o mesmo texto de apoio; não exibe “PROJECT ARCHIVE” nem a apresentação anterior.
- **SC-009**: Em 100% das entradas, os chips de tecnologia não aparecem no resumo fechado; após expansão, todos os valores de tecnologia verificados daquele projeto aparecem nos detalhes e continuam pesquisáveis/filtráveis.
- **SC-010**: Em 100% dos projetos com mídia aprovada e verificada, a expansão mostra a mídia inline no layout responsivo definido; nenhuma fonte sem provenance/autorização verificadas é exibida.
- **SC-011**: Todas as fronteiras entre entradas do catálogo usam o mesmo tratamento de divisor e espaçamento definido pelo padrão de estilo.
- **SC-012**: Context e Technology permitem busca de opções e seleção múltipla independente; uma consulta digitada somente no campo interno de uma faceta não altera resultados nem contador de projetos.
- **SC-013**: Quando a busca de opções de uma faceta não encontra valores, o estado vazio aparece dentro daquele menu; os critérios de projeto e sua contagem permanecem inalterados.
- **SC-014**: “Search for”, “Context” e “Technology” são rótulos visíveis e posicionados acima dos respectivos campos/seletores.
- **SC-015**: Em todas as interações dos filtros, nunca há mais de um menu de faceta aberto; alternar entre eles preserva todas as seleções e resultados correntes.

## Assumptions

- O arquivo atual contém 19 registros publicados; o total exibido deve acompanhar o catálogo real após inclusões ou remoções futuras, em vez de permanecer fixo em 19.
- Context e Technology são as duas facetas iniciais. A taxonomia Context deriva de classificação confirmada (por exemplo, profissional, independente, estudo); “game/software/product” descreve tipo e não é misturado à faceta Context.
- Os agrupamentos editoriais existentes podem ser ajustados para não classificar incorretamente um produto por sua tecnologia, desde que a ordem geral e as entradas permaneçam reconhecíveis.
- A lista inicial usa uma ordem editorial estável existente; busca e facetas filtram essa ordem sem ordenar por relevância, popularidade ou métricas de visitante.
- Resumos exibem apenas fatos presentes nas fontes atuais de conteúdo. Ausência de contribuição, stack ou período confirmados não será preenchida por inferência.
- Miniaturas são complementares, e conteúdo profundo fica expandido sob demanda junto à respectiva entrada.
- Chips/tags que identificam tecnologia permanecem disponíveis para busca/filtros e dentro de Project details, mas não aparecem no resumo compacto de cada projeto.
- O texto, título e composição do cabeçalho da página de catálogo acompanham a seção “More Projects” da Home; “All Projects” identifica a rota completa alcançada pelo link homônimo.
- Os rótulos Search for, Context e Technology aparecem acima de seus respectivos controles; a interação das facetas mantém no máximo um menu aberto e preserva seleções ao alternar.
- Mídia verificada aparece em coluna ao lado dos detalhes no desktop e acima deles no celular; a revisão visual da implementação continua necessária conforme a constituição do projeto.
- A feature não cria novos estudos de caso, conteúdo biográfico, claims de impacto, mídia, autorização de uso ou integração de analytics.
- A feature não inclui estudo de usabilidade com participantes nem comparação antes/depois; a validação desta etapa usa os critérios funcionais, de acessibilidade e responsividade SC-001–SC-012.
- Esta feature agora ocupa o número 006. A hipótese anterior de ficha única e faixa horizontal foi substituída pelo catálogo compacto com busca, filtros e detalhes expansíveis descrito nesta spec.
- Os resultados da auditoria independente e as decisões atuais do inventário foram consultados para fundamentar a abordagem. O registro mais antigo do inventário que recomenda navegação por âncoras sem filtros antecede este pedido explícito de busca e facetas; este escopo mais recente prevalece para esta feature, sem reescrever o histórico.
- Qualquer atualização de dados ou componente compartilhado será limitada ao necessário para a descoberta do arquivo e preservará outras seções/cases bloqueados para mudanças.

