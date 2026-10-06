# Catálogo de projetos: contribuição e leitura para contratação

**Data:** 2026-10-05  
**Status:** estudo e proposta editorial para discussão; não aprovado como requisito.  
**Feature relacionada:** `specs/006-projects-catalog/`. Este documento não cria uma feature nem altera a spec, o código ou o conteúdo publicado.

## 1. Recomendação

Manter a composição inicial de mídia à esquerda e pôster de identidade, título, descrição e `More details` à direita. Nos detalhes, manter os fatos compactos e substituir a apresentação obrigatória de **Product / Contribution / Engineering focus** por uma seção **Selected contributions**:

1. Um parágrafo curto que explica a atuação individual e seu escopo.
2. Dois ou três destaques técnicos, quando houver conteúdo comprovado, cada um conectando um problema concreto ao mecanismo empregado.
3. Resultado ou evidência disponível, quando documentado, e os links existentes.

Essa é uma recomendação editorial para este catálogo. Uma única seção pode conter parágrafo e lista; juntar os três textos atuais sem edição produziria um texto longo e preservaria a repetição.

O objetivo profissional é permitir responder: **o que é o produto, o que Phillipe fez, qual dificuldade técnica estava envolvida e onde posso aprofundar ou verificar isso?** A nova apresentação deve preservar essas respostas, mesmo reduzindo os rótulos.

## 2. O que a pesquisa sustenta

### Portfólio precisa tornar a atuação identificável

Em pesquisa com 204 profissionais responsáveis por contratação em UX, a NN/g encontrou interesse em problema, papel, restrições e processo, além do resultado visual. A recomendação da publicação é selecionar e organizar o conteúdo para diferentes leitores, incluindo recrutadores e gestores. Isso sustenta destacar atuação e raciocínio na apresentação, sem transformar cada registro do catálogo em um estudo de caso completo. [NN/g — 5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/).

### Conteúdo estruturado favorece a leitura seletiva

A pesquisa de leitura com rastreamento ocular da NN/g descreve a procura por títulos e subtítulos informativos antes da leitura do corpo. A publicação recomenda agrupar conteúdo relacionado, remover excesso e usar parágrafos ou listas. Para esta proposta, a inferência é conservar pontos de entrada claros dentro da seção, por exemplo **Radio guidance** e **Mission flow**, em vez de depender apenas de um parágrafo extenso. [NN/g — The Layer-Cake Pattern of Scanning Content on the Web](https://www.nngroup.com/articles/layer-cake-pattern-scanning/).

### Projetos de engenharia devem demonstrar trabalho

O guia editorial do Indeed para software engineers diferencia o portfólio, que apresenta exemplos do trabalho, do currículo, que descreve a experiência. Recomenda explicar os projetos e selecionar links que demonstrem habilidades pertinentes. Aqui isso favorece aproximar contribuição, explicação técnica e evidência disponível. [Indeed — How To Create a Software Engineer Portfolio](https://www.indeed.com/career-advice/career-development/how-to-create-software-engineer-portfolio).

### Limites

As pesquisas da NN/g citadas tratam de leitura na web e de portfólios de UX, não de uma comparação entre estas duas apresentações para contratar Unity/Flutter engineers. O Indeed oferece orientação editorial, não um experimento que prove aumento de contratação. Portanto, a seção proposta é uma hipótese fundamentada; nenhuma dessas fontes demonstra que remover estes três rótulos aumenta entrevistas ou ofertas.

## 3. Diagnóstico do repositório

Inspeção de `src/components/ProjectRecord.astro`, `src/data/projects.ts`, da spec 006 e da constituição. Esta etapa não fez uma nova validação visual no navegador nem coletou respostas de recrutadores.

### Apresentação inicial

| Elemento | Avaliação e ajuste proposto |
| --- | --- |
| GIF/mídia | Ajuda a reconhecer o produto e ver seu funcionamento. Manter como apoio; não estabelece autoria individual. Preservar fallback e carregamento existentes. |
| Pôster antes do título | Bom identificador visual. É identidade do projeto, não retrato profissional. A entrada precisa continuar compreensível sem ele. |
| Título | Manter explícito e independente da imagem. |
| Descrição | Manter uma descrição curta do propósito do produto. Futuramente revisar editorialmente sua extensão e conteúdo. |
| More details | Mantém aprofundamento sob demanda sem ampliar todas as entradas. Preservar a segunda linha de detalhes abaixo das duas colunas. |
| Role / Context / Type / Period | São bons fatos para situar experiência; manter compactos e distintos, dentro dos detalhes como estão hoje. |

O componente atual extrai automaticamente a primeira frase de `product` para a descrição recolhida e coloca o restante sob **Product**. Isso explica a divisão, mas não assegura que a primeira frase seja o melhor resumo para contratação. Em Ello Learn ela inclui uma relação extensa de atividades e arquitetura; em Pathless prioriza equipe, evento e prazo antes do comportamento do jogo. Uma futura descrição revisada deve priorizar o entendimento do produto, sem inventar informações.

### Onde há repetição

- **Product:** frequentemente continua uma descrição que o visitante já iniciou na entrada.
- **Contribution:** enumera sistemas e funcionalidades implementados.
- **Engineering focus:** retorna aos mesmos sistemas para explicar mecanismos. A distinção entre atuação e mecanismo é útil; a repetição de listas de funcionalidades é dispensável.
- Em Wallace’s Quest, ambos os últimos blocos retomam fluxo de turnos, conclusão de ações e vitória/derrota. Podem formar uma explicação mais direta, preservando o que foi implementado e como os sistemas se coordenam.

### Metadados também precisam de revisão semântica

O componente prefixa `Context` com Professional/Independent/Study, mas o conteúdo livre pode repetir a classificação ou incluir função. O campo `Type` também pode reunir evento e stack, enquanto existe uma lista separada de tecnologias.

Proposta de significado para revisão futura:

- **Role:** função e escopo individual.
- **Context:** organização, equipe ou circunstância do trabalho, sem repetir Role.
- **Type:** natureza do produto, quando confirmada.
- **Period:** período documentado.
- **Technology:** tecnologias confirmadas, separadas dos demais campos.

Não substituir automaticamente os valores existentes: revisar cada registro e suas fontes. Essa limpeza é complementar à consolidação dos três blocos.

## 4. Organização proposta

```text
ENTRADA RECOLHIDA
Mídia | Pôster + título
      | Descrição curta do produto
      | + More details

DETALHES — largura disponível abaixo das duas colunas
Role: ...
Context: ...
Type: ...
Period: ...

Selected contributions
Parágrafo curto: atuação individual e limite de responsabilidade.
• Destaque específico: problema + mecanismo + consequência comprovada.
• Destaque específico: problema + mecanismo + consequência comprovada.

Technology: ...
Links existentes: estudo de caso / produto / demonstração
```

**Selected contributions** é o rótulo adotado na revisão de 2026-10-05: informa que a ficha apresenta recortes selecionados, não uma lista completa da atuação. Substitui a recomendação inicial My contribution, que podia sugerir escopo exaustivo. O resumo deve representar a amplitude documentada do trabalho; destaques continuam como exemplos específicos.

Os destaques não precisam repetir subtítulos fixos como Challenge, Solution e Result em todas as fichas. Usar nomes específicos dos sistemas ajuda a distinguir os projetos. Como ponto de partida editorial, experimentar um parágrafo de uma ou duas frases e até três destaques; isso não é um limite científico ou um requisito aprovado.

Se houver informação de produto indispensável para entender a contribuição, incorporá-la perto do trecho relevante. Um projeto complexo pode justificar uma nota adicional; não tornar Product obrigatório para todos. Se houver pouco conteúdo comprovado, basta o parágrafo, sem lista vazia ou preenchimento artificial.

### Por que esta alternativa

| Alternativa | Consequência provável, a validar |
| --- | --- |
| Manter os três blocos atuais | Separação explícita de assuntos, mas risco de repetir produto e sistemas. |
| Juntar tudo em um parágrafo | Menos rótulos, mas leitura seletiva mais difícil e possível repetição intacta. |
| Uma seção com atuação e destaques técnicos | Consolida assuntos relacionados e permite localizar escopo e mecanismos. É a hipótese recomendada. |

Não reintroduzir automaticamente limites de largura removidos a pedido do usuário. A primeira intervenção proposta é no conteúdo e na hierarquia; qualquer mudança de largura precisa de avaliação visual própria. Preservar o cabeçalho aprovado, incluindo entrelinha de 24px e espaçamentos.

## 5. Exemplos editoriais para discussão

Os exemplos abaixo resumem apenas os campos atuais de `src/data/projects.ts`. Não constituem nova verificação da evidência original nem autorização de publicação. Antes de substituir textos públicos, conferir os registros canônicos de contribuição. Evitar atribuir ao autor decisões de arquitetura cuja autoria não esteja comprovada.

### Pathless

**Selected contributions**

Implemented the proximity radio scanner and HUD, survivor interaction and assistance flows, and rescue accounting. Integrated these systems into the mission loop, from arrival and discovery to extraction and results.

- **Radio guidance:** Data-driven signal definitions map distance to discrete signal strengths, keeping proximity feedback separate from direction.
- **Mission flow:** Events and delegates connect mission state to rescue accounting and results; Unity Awaitable sequences arrival.

A descrição recolhida continua explicando o jogo de resgate e exploração. A contribuição declara o trabalho individual documentado; os destaques descrevem o funcionamento técnico registrado, sem alegar que Phillipe decidiu sozinho toda a arquitetura. O prazo e a equipe ficam nos fatos compactos, quando suas fontes permitirem.

### Ello Learn

**Selected contributions**

Contributed to quest progression and rewards across configuration-driven models, services, and Flutter screens. Connected home activities to learning-agent requests across Python services and client routing, and implemented the parent-gate flow.

- **Progression reliability:** Completion validates interaction IDs and suppresses repeated rewards; local progress remains resilient to noncritical sync and analytics failures.
- **Request coordination:** Guarded initialization and shared in-flight requests prevent duplicate work across the configured flows.

Não acrescentar redução percentual de erros, aumento de retenção ou propriedade integral do backend. Esses resultados não estão demonstrados pelos campos consultados. O estudo de caso existente oferece o aprofundamento; o catálogo não precisa reproduzi-lo inteiro.

## 6. Evidência e manutenção dos dados

Consolidar a apresentação não implica apagar os conceitos de produto, contribuição e engenharia dos dados. Eles podem continuar separados como fonte editorial e para busca. Também não implica concatenar automaticamente as strings atuais.

Uma próxima spec deve definir como armazenar o resumo revisado e os destaques, preservando rastreabilidade e conteúdo público pesquisável. O desenho do schema cabe ao planejamento posterior.

Conforme a constituição e os registros de evidência do projeto:

- Material público do produto não comprova autoria individual.
- Não inventar métricas, decisões, restrições, resultados, imagens ou CTAs.
- Consequências observáveis no funcionamento, como validação de IDs ou coordenação de turnos, podem ser explicadas conforme a fonte; não convertê-las em ganhos comerciais ou de performance sem medição.
- Links de demonstração ajudam a ver o produto; estudos de caso ou evidência de implementação ajudam a avaliar contribuição. São provas de coisas diferentes.
- Sem resultado documentado, omitir esse trecho. A ausência de métricas não impede uma ficha tecnicamente concreta.
- Preservar os quatro estudos de caso e as ações externas existentes.

## 7. Candidatos para a próxima revisão da spec 006

Propostas ainda não aprovadas:

1. A entrada recolhida explica o produto sem exigir leitura dos detalhes ou animação.
2. Detalhes apresentam fatos compactos e uma seção de contribuição, com destaques técnicos opcionais.
3. A seção distingue explicitamente atuação individual e funcionamento geral do produto/equipe.
4. Cada destaque oferece informação específica; listas de tecnologia desacompanhadas de aplicação não substituem a explicação.
5. Resumo, contribuição e destaques não repetem a mesma afirmação sem acrescentar informação.
6. Registros sem contribuição confirmada não recebem texto inferido, seção vazia ou promessa de resultado.
7. O conteúdo revisado continua pesquisável; filtros, contador, deep links, expansão e navegação sem scripts preservam seus contratos.
8. Mídia, identidade visual e cabeçalho conservam as decisões aprovadas; revisão de texto não autoriza um novo redesenho.

## 8. Como validar o benefício

Propor uma comparação editorial futura entre a apresentação atual e a candidata, com as mesmas informações comprovadas. Incluir recrutadores e profissionais que avaliam engenharia, quando disponíveis; avaliações informais internas devem ser identificadas como tal.

Tarefas representativas:

1. Explicar em uma frase o que o produto faz.
2. Identificar o que Phillipe implementou e o que não está atribuído a ele.
3. Encontrar um mecanismo técnico relevante para a vaga considerada.
4. Localizar contexto, período e tecnologias.
5. Encontrar um destino existente para aprofundar ou verificar o projeto.

Registrar acerto, confusões de autoria, tempo por tarefa e comentários de clareza. Alternar a ordem das versões entre participantes para reduzir o efeito de aprendizado. Usar pelo menos projetos profissional, independente e sem mídia/contribuição extensa.

A versão atual fornece a linha de base. Antes da coleta, definir como julgar respostas corretas e qual diferença observada justificará a mudança. Não estabelecer uma melhoria percentual inventada nem usar facilidade de leitura como prova de aumento de contratação. A comparação com participantes é pesquisa futura, não validação já executada ou escopo automaticamente adicionado à feature.

## 9. Próxima decisão

Revisar estes exemplos com o usuário e confirmar a seção **Selected contributions**, sua posição e o nível de síntese. Depois, incorporar apenas as decisões aceitas à spec 006 e planejar a edição das fichas com suas fontes. O ganho esperado é comunicar competência específica com menos redundância, mantendo profundidade disponível e limites de autoria claros.
