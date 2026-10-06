# Revisão do portfólio para contratação — 2026-10-05

## 1. Escopo, método e limites

Revisão editorial, visual e de navegação da versão local atual, sob a perspectiva de triagem de recrutamento e avaliação técnica de um gestor de engenharia. É uma avaliação especializada simulada, não o parecer de uma empresa contratante nem uma previsão de contratação.

**Estado avaliado:** feature 006, commit de referência `abc9272`, incluindo alterações locais posteriores de navegação, revelação das páginas e alinhamento do cabeçalho. Este relatório não modifica requisitos, aprova decisões de produto ou inicia implementação.

Foram consultados a Home, `/projects/` e os quatro estudos de caso no navegador; componentes, dados e documentos do repositório; fontes públicas sobre revisão de portfólios, leitura na web, contratação em jogos, acessibilidade e desempenho. A avaliação anterior em `docs/projects-catalog-hiring-review.md` foi usada como registro histórico. O catálogo atual já incorporou sua direção editorial; observações daquele documento sobre os três blocos antigos não descrevem mais a implementação vigente.

Inspeção visual em desktop e amostra do catálogo em 390 × 844px. Foram exercitados busca, filtro de tecnologia, limpeza, estado vazio e expansão. A Home e os heros de catálogo/Wallace foram inspecionados visualmente; os quatro casos tiveram seu conteúdo público lido no DOM. Não houve inspeção visual exaustiva de cada diagrama de cada caso.

Não foram feitos nesta rodada: entrevistas com recrutadores, auditoria completa de acessibilidade, leitor de tela real, medição de Core Web Vitals, rede lenta, JS desativado, auditoria do PDF do currículo, conferência dos repositórios externos ou validação de cada destino externo. Não se deve converter esta revisão em aprovação desses itens. As pendências anteriores em `evaluation.md` continuam válidas.

**Premissa solicitada:** algumas entradas estão em construção e serão preenchidas no padrão das completas. A falta temporária de contribuição, período ou mídia não será interpretada como falta de experiência. Contudo, preenchimento futuro não comprova por antecipação autoria, impacto ou senioridade. Se a estrutura atual cria uma barreira, ela permanece uma barreira mesmo com conteúdo completo.

## 2. Parecer executivo

**O portfólio tem uma direção profissional coerente e já oferece material suficiente para justificar uma conversa técnica sobre Unity, produtos interativos e engenharia de cliente.** O catálogo deixou de ser uma sequência de fichas extensas e hoje permite uma leitura seletiva. A separação entre quatro casos aprofundados e um inventário amplo é adequada ao conteúdo disponível.

Em uma triagem simulada para uma vaga alinhada, eu encaminharia o perfil para avaliação técnica. Eu ainda não usaria o site isoladamente para concluir nível Senior, Lead ou Staff. Há sinais de experiência sustentada e domínio técnico; a demonstração de decisões de produção, responsabilidade sobre entregas e influência sobre outras pessoas é menos explícita.

A maior oportunidade agora está na **hierarquia da evidência profissional**: permitir que o leitor reconheça rapidamente contribuição, dificuldade, decisão e consequência, sem ter de combinar vários parágrafos e ressalvas. O acabamento visual está suficientemente consistente para que uma nova mudança ampla de layout tenha menor prioridade.

### Resumo por dimensão

As classificações abaixo são julgamento qualitativo, não uma escala validada ou uma comparação com outros candidatos.

| Dimensão | Avaliação atual | O que limita a conclusão |
| --- | --- | --- |
| Identidade visual | Coerente e profissional | Pequenos rótulos e linhas longas merecem avaliação de leitura |
| Posicionamento | Claro para Game/Unity Engineer | Senioridade e vaga preferida dependem de inferência |
| Descoberta no catálogo | Boa base | Taxonomia de tecnologias fragmenta resultados |
| Clareza do produto | Boa nas entradas completas | Parte dos resumos ainda é genérica, por conteúdo em construção |
| Contribuição individual | Forte nos registros revisados | Limites de autoria aparecem repetidos em vários pontos |
| Profundidade técnica | Convincente em Read With Ello e Wallace | Casos de Ilhas e Craque ainda têm explicações mais gerais |
| Consequências do trabalho | Parcial | Muito mecanismo; pouca consequência documentada destacada |
| Colaboração | Presente | Depoimentos ajudam, mas faltam situações concretas de influência |
| Responsividade | Amostra de catálogo satisfatória | Não equivale a auditoria de todos os casos e zoom |
| Acessibilidade e resiliência | Há boas bases | Movimento, semântica e carregamento têm pontos a verificar |

## 3. O que a pesquisa realmente sustenta

### 3.1 Portfólio como ferramenta de leitura seletiva

A NN/g recomenda uma seleção de trabalhos alinhada ao objetivo profissional e casos que expliquem problema, papel, restrições e decisões. Sua pesquisa de contratação é de UX; a aplicação à engenharia aqui é uma inferência editorial, não evidência direta sobre contratação de Unity engineers. Não existe razão para transformar todos os 19 registros em casos completos. [NN/g: criação de portfólios](https://www.nngroup.com/articles/ux-design-portfolios/).

A pesquisa de leitura da NN/g favorece títulos informativos e agrupamentos que permitam localizar conteúdo antes de lê-lo integralmente. Isso apoia destaques técnicos específicos por projeto, em vez de repetir rótulos abstratos em toda ficha. [NN/g: leitura por títulos e blocos](https://www.nngroup.com/articles/layer-cake-pattern-scanning/).

### 3.2 Avaliação depende da função

A Riot descreve revisão de portfólio e avaliações técnicas como etapas dependentes da função. Isso ajuda a delimitar a expectativa: o site deve facilitar discussão e acesso ao trabalho, sem pretender substituir entrevista, avaliação de código ou entendimento do contexto profissional. A página não estabelece uma fórmula universal para aprovar candidatos. [Riot: processo de entrevistas](https://www.riotgames.com/en/work-with-us/interviewing-at-riot).

### 3.3 Estrutura, interação e leitura acessível

A W3C recomenda regiões e títulos que organizem o conteúdo e descreve disclosures operáveis por teclado com estado de expansão identificável. A inspeção de DOM é útil, mas não prova a experiência de um leitor de tela. [Regiões de página](https://www.w3.org/WAI/tutorials/page-structure/regions/), [títulos](https://www.w3.org/WAI/tutorials/page-structure/headings/), [disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

Reflow exige verificar conteúdo ampliado e larguras equivalentes a 320 CSS px; uma amostra em 390px não basta. Animações automáticas com mais de cinco segundos, em paralelo com outro conteúdo e sem caráter essencial, exigem mecanismo de pausa, interrupção ou ocultação. A preferência por movimento reduzido não resolve sozinha todos esses cenários. [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

### 3.4 Desempenho percebido precisa ser medido

Core Web Vitals avalia carregamento, resposta a interação e estabilidade visual. Os limiares de referência são LCP ≤ 2,5s, INP ≤ 200ms e CLS ≤ 0,1 no percentil 75. São metas de medição, não resultados obtidos por este site. Uma página visualmente estável em localhost não estabelece desempenho em produção. [web.dev: Web Vitals](https://web.dev/articles/vitals).

Não foi adotada uma regra universal de “recrutador só olha por seis segundos”, nem promessa de aumento de entrevistas. As recomendações seguintes decorrem principalmente da inspeção deste portfólio.

## 4. Leitura como recrutador e como gestor técnico

### Primeira impressão

A Home torna a especialidade identificável: Game Engineer, trajetória longa em software e Unity/C#, exemplos comerciais e independentes. Currículo e perfis estão próximos do topo. Tipografia, cores e espaçamentos comunicam intenção editorial sem competir com o trabalho.

A frase principal ainda poderia ser mais específica: “responsive, polished, memorable” descreve qualidades desejáveis, mas diferencia pouco a atuação. Uma revisão futura pode destacar a combinação realmente demonstrada: sistemas de gameplay, fluxos assíncronos de produto e ferramentas de cliente. Isso é uma proposta de direção, não texto aprovado.

### Aprofundamento

Read With Ello demonstra trabalho em produto comercial com integração, estado, recursos e ferramentas. Wallace permite uma conversa concreta sobre turnos, ações, busca e fronteiras entre módulos. Ilhas e Craque mostram amplitude e continuidade profissional, mas hoje detalham menos as decisões verificáveis. Não penalizo a recuperação ainda incompleta; priorizaria completar pelo menos um deles com a mesma qualidade de narrativa dos casos fortes.

### O que eu perguntaria em entrevista

- Que decisões você tomou e quais já estavam definidas pelo time?
- Como uma falha de serviço, cancelamento ou callback tardio afetava o jogador?
- Como você validou o comportamento e soube que a mudança podia ser entregue?
- Que decisão envolveu colaboração com produto, design, QA ou outros engenheiros?
- O que você simplificou ou recusou implementar, e por quê?
- Em que situação sua atuação ajudou outro desenvolvedor ou reduziu risco da equipe?

Essas são perguntas suscitadas pelo conteúdo. A ausência de resposta pública não implica incapacidade, mas representa oportunidade de mostrar senioridade com fatos.

## 5. Home: o que manter e o que melhorar

### Manter

- Hero direto, currículo acessível e links de contato/perfis.
- Quatro estudos de caso com diferentes tipos de problemas.
- Separação entre Selected work e More Projects.
- About baseado em modo de trabalhar, com exemplos concretos, em vez de uma lista de adjetivos.
- Experience conectada aos projetos e depoimentos com identidade e relação profissional.

### Ajustes recomendados

**H1 — Curadoria antes de cronologia.** Ilhas abre Selected work com um placeholder de mídia e uma narrativa menos aprofundada que Read With Ello. Como conteúdo em construção, isso é temporário; porém a primeira amostra concentra a percepção de qualidade. Até a recuperação estar completa, avaliar colocar primeiro o caso comercial mais bem comprovado. Quando Ilhas estiver completo, reavaliar pela relevância para a vaga, sem fixar uma ordem universal.

**H2 — Identificação textual em More Projects.** `SupportingProject.astro`, no modo `simple`, mantém o nome em `h3.sr-only`. O usuário visual depende do pôster para reconhecê-lo. Na amostra, Pathless é identificável pela arte, enquanto os demais cards exibem placeholders. Preencher mídia melhora isso, mas não garante que o nome faça parte da imagem. Recomendo um título visível pequeno e permanente; não precisa adicionar outra ficha extensa.

**H3 — Amplitude de Ello na Experience.** O contexto da organização em `experience.ts` enfatiza Unity, embora a lista inclua Ello 2.0, cuja contribuição recente usa Flutter/Dart/Python. Não é uma contradição automática de cargo; é uma oportunidade de explicar a transição de escopo com um fato curto e documentado.

**H4 — Depoimentos para público internacional.** Trechos em português são legítimos e úteis, mas a Home em inglês não entrega o mesmo sinal a todos os leitores. Uma tradução identificada, com original e fonte preservados, é opção editorial. Não editar a fala como se a versão traduzida fosse a citação original.

## 6. All Projects: avaliação da apresentação atual

### Composição

Mídia à esquerda, ícone e título, descrição e More details à direita funcionam bem no desktop. O tamanho máximo de mídia de 300px mantém o apoio visual proporcional. Entradas sem mídia continuam compreensíveis e mais compactas. Não é necessário preencher a coluna vazia com uma imagem decorativa.

O painel abaixo das duas colunas torna a expansão previsível e aproveita o espaço. Os fatos compactos reduzem repetição. Selected contributions comunica corretamente que os exemplos não esgotam a atuação individual.

O cabeçalho All Projects está alinhado à linguagem da Home. O espaço superior foi corrigido para o mesmo token de 16px no desktop; não há motivo nesta revisão para reabrir esse ajuste ou a entrelinha de 24px.

### Leitura dos detalhes

Os detalhes têm largura grande no desktop, sem o limite anterior. Isso atende à decisão atual, mas os parágrafos podem produzir linhas longas. O risco é de leitura, não um defeito demonstrado por teste de participantes. Antes de reintroduzir qualquer limite, experimentar edição mais concisa e destaques realmente distintos. Um novo limite de largura dependeria de decisão específica do usuário.

Os rótulos pequenos em caixa alta funcionam como organização secundária; não devem competir com os destaques técnicos. O bom resultado vem dos títulos específicos, como Progression reliability e Proximity radio guidance, e do conteúdo abaixo deles.

Role, Context, Type e Period estão no painel. Isso é compacto, mas obriga uma expansão para distinguir atuação, contexto e data na leitura sem filtros. Pode-se pesquisar se a triagem sofre com isso; não há evidência nesta revisão que justifique colocar todos os metadados de volta na entrada recolhida.

### Descoberta e filtros

Observado nesta rodada:

| Ação | Resultado |
| --- | --- |
| Busca `pathless` | 1 de 19 projetos |
| Limpar filtros | 19 de 19 |
| Busca sem correspondência | 0 de 19 e mensagem curta |
| Seleção de Technology: Unity | 10 de 19 |
| Abrir Technology | Foco em `technology-options-search` |
| Catálogo a 390px | Campos reorganizados, mídia acima do texto; sem overflow horizontal na amostra |

**C1 — Normalizar tecnologia.** Unity e Unity 6 são opções independentes; a correspondência atual é exata. Selecionar Unity pode omitir Pathless, embora o produto use Unity 6. O usuário espera uma família de tecnologia, não necessariamente uma versão. Recomendo separar identidade canônica de versão exibida: filtro Unity abrange Unity 6; o detalhe pode conservar Unity 6. Essa decisão deve ser especificada e aplicada aos dados, sem alterar os fatos históricos.

**C2 — Visibilidade da seleção.** O combo mostra quantidade selecionada. É suficiente para saber que há filtros, mas não para lembrar quais valores foram escolhidos após fechar o menu. Uma hipótese compacta é resumir um valor e a quantidade restante, ou oferecer um resumo discreto dos filtros ativos. Não misturar contexto e tecnologia numa nova lista única.

**C3 — Busca ampla sem ruído de interface.** A implementação pesquisa `record.textContent`, incluindo rótulos como More details e Technology. Para intenção profissional, seria melhor indexar explicitamente campos públicos do projeto, fatos e contribuição. A inspeção do código estabelece esse comportamento; não foi executada uma bateria de relevância da busca.

**C4 — Estado vazio.** “No projects match these filters.” é suficiente aqui, porque Clear all filters está presente. Não é necessário restaurar a segunda frase. O critério é a ação de recuperação continuar visível e acessível quando não há resultados.

**C5 — Acesso ao case.** O link View case study dentro dos detalhes mantém o catálogo compacto. Se a descoberta dos quatro casos for uma dificuldade real em tarefas de triagem, avaliar um indicador ou ação discreta visível. Não criar CTAs onde não há destinos existentes.

## 7. Contribuições e sinais de senioridade

### O que já convence

- Read With Ello: coordenação entre estado local, serviços e feedback; ciclo de vida de conteúdo; ferramentas compartilhadas.
- Ello 2.0: validação de conclusão, prevenção de recompensas repetidas e coordenação de requisições.
- Pathless: integração de scanner, HUD, assistência e missão, com distinção entre trabalho individual e colaboração.
- Wallace: explicação de handoffs de turno e ação, limites da busca e diferença entre módulo experimental e build público.

Esses conteúdos permitem avaliar raciocínio e fronteiras reais de responsabilidade. Não são apenas enumeração de engines.

### O que ainda poderia causar mais impacto

**S1 — Consequência concreta junto da decisão.** Depois de explicar um mecanismo, esclarecer o que ele permite ou evita quando isso está documentado. Exemplos de perguntas editoriais: o que acontece numa falha de sincronização? Que sequência o jogador consegue concluir? Que recurso deixa de escapar de seu dono? Não transformar plausibilidade técnica em resultado medido.

**S2 — Evidência de trabalho em equipe.** Acrescentar um ou dois exemplos comprovados de revisão, coordenação técnica, suporte a desenvolvedores ou negociação de escopo. Depoimentos não substituem a narrativa da situação, mas podem corroborá-la. Não é preciso criar uma seção de liderança artificial para todos os projetos.

**S3 — Qualidade e entrega.** Quando houver registros, mostrar como foram verificados estados de erro, migrações e integrações. Um teste de regressão, uma sequência de reprodução, um diagrama baseado em código ou uma decisão registrada pode ser mais informativo que uma métrica comercial sem atribuição clara.

**S4 — Equilibrar precisão com fluidez editorial.** As ressalvas em Read With Ello, Ello 2.0 e Wallace são honestas, mas algumas interrompem a explicação principal para listar o que o candidato não fez. Preservar os limites e concentrá-los numa nota de escopo quando isso reduzir repetição. Não eliminar limitações que mudam a interpretação, como a busca sem optimalidade demonstrada ou o módulo não integrado ao build.

### Avaliação dos quatro estudos de caso

| Caso | Força atual | Próxima melhoria de maior valor |
| --- | --- | --- |
| Read With Ello | Narrativa comercial mais completa; três problemas distintos e limites claros | Dar primeiro uma síntese da contribuição e consequências; reduzir ressalvas repetidas |
| Wallace’s Quest | Raciocínio técnico verificável e reflexão madura | Alinhar período: hero Aug 2020 versus catálogo 2020–2021/revisita 2026; identificar cada fase |
| Ilhas do Alfabeto | Amplitude em produto comercial e manutenção prolongada | Recuperar uma decisão concreta com evidência; substituir placeholders apenas quando houver mídia adequada |
| Craque da Fluência | Problema relevante de integração e estado incerto | Detalhar um caso real de entrada inválida, sessão ou reteste e sua resolução documentada |

O título My contribution nos cases e Selected contributions no catálogo não é um erro automático: são formatos diferentes. Ainda assim, o significado de seleção deve continuar explícito para evitar que um caso pareça inventário completo da atuação.

## 8. Entradas em construção: como avaliar e completar

Não recomendo fabricar narrativas uniformes para “parecer completo”. Um projeto de estudo pode precisar apenas de propósito, exercício realizado e link existente. Um trabalho comercial extenso pode merecer contribuição e dois destaques; nenhum deles precisa ganhar métricas por obrigação.

Padrão mínimo de conclusão editorial:

1. Nome e resumo identificam o produto sem depender de mídia.
2. Função, organização e tipo não se confundem.
3. Contribuição descreve o que Phillipe fez, sem atribuir o produto inteiro.
4. Se há destaque técnico, problema e mecanismo são específicos e rastreáveis.
5. Período e tecnologias vêm de documentação; ausência é permitida.
6. Consequência e resultado só aparecem quando sustentados.
7. Links são reais; mídia é contextualizada; material de terceiros não é apresentado como criação individual.

Se todos os registros forem preenchidos nesse padrão, o inventário demonstra amplitude com mais clareza. Isso não resolve automaticamente curadoria da Home, taxonomia, acessibilidade, desempenho ou demonstração de influência profissional.

## 9. Navegação, acessibilidade e qualidade técnica

**Q1 — Revelação dependente de fontes.** A alteração local em BaseLayout oculta o body até DOM e fontes ficarem prontos, com liberação de segurança em 4s. Resolve a exposição do topo no retorno, mas pode trocar um salto visual por espera em branco numa rede ruim. Não recomendo desfazer a decisão aprovada com base apenas nessa possibilidade; registrar e medir o comportamento em produção/rede lenta, inclusive falha de Google Fonts e retorno à posição salva. O temporizador não comprova uma experiência rápida.

**Q2 — Animações em todo o site. Decisão posterior:** o usuário determinou remover Stop/Play de todas as superfícies. A recomendação anterior de acrescentar um controle de pausa está retirada e não deve orientar a implementação. Preservar ativação configurada, fallback estático e reduced motion. Isso registra uma decisão de produto, não uma conclusão de conformidade WCAG; duração e conformidade das mídias não foram auditadas nesta revisão.

**Q3 — Dois landmarks main.** BaseLayout envolve o slot em main e `/projects/` contém outro main. O DOM inspecionado confirma a estrutura aninhada. Recomendo um único main e um contêiner interno sem esse landmark. É correção semântica localizada, não redesign.

**Q4 — Semântica dos combos.** São disclosures com busca local e checkboxes, não um combobox ARIA tradicional. Não alterar roles apenas para adequar o nome informal “combo”. Verificar teclado, anúncio de seleção e Escape/foco com tecnologia assistiva; os estados vistos na árvore não equivalem a essa validação completa.

**Q5 — Busca e filtragem.** Verificar anúncio do contador, foco quando um item some, deep link sob filtros e recuperação após navegação. A rodada observou os cenários básicos; a matriz completa continua pendente.

**Q6 — Leitura móvel e ampliada.** A amostra de 390px foi boa. Próxima validação deve incluir 320px, zoom, textos longos, detalhes e diagramas dos casos, sem tomar a amostra como conformidade geral.

**Q7 — Resiliência e evidência pública.** Verificar JS desligado, imagem/GIF bloqueado, fontes indisponíveis, destino de currículo e links externos. Os disclosures nativos são uma base positiva para ausência de JS; isso ainda precisa ser exercitado no navegador.

## 10. Prioridades recomendadas

| Ordem | Ação | Por que agir | Escopo |
| --- | --- | --- | --- |
| 1 | Fortalecer uma narrativa comercial com decisão, consequência e evidência | Maior valor para avaliação de senioridade | Editorial; usar recuperação de conteúdo em andamento |
| 2 | Normalizar Unity/Unity 6 e rever campos indexados | Evita descoberta incompleta e busca por rótulos | Dados/comportamento; complementar feature 006 |
| 3 | Mostrar nomes permanentes em More Projects e revisar primeiro case | Melhora primeira amostra e identificação visual | Home; requer decisão de escopo antes de implementar |
| 4 | Validar carregamento, movimento e semântica; corrigir main aninhado | Qualidade percebida e acesso ao conteúdo | Plataforma compartilhada e catálogo |
| 5 | Alinhar períodos/escopo entre catálogo, casos e Experience | Reduz ambiguidades de trajetória | Revisão editorial com fontes |

Como o resgate de conteúdo já está em andamento, a **próxima ação estrutural mais objetiva é a prioridade 2**. Se a intenção for exclusivamente impacto profissional editorial, priorizar consequência e evidência no caso comercial mais forte, em vez de outra rodada de espaçamentos.

## 11. Validação futura proposta

Esta seção é proposta de pesquisa, não tarefa automaticamente obrigatória ou aprovação de spec.

Usar uma amostra exploratória de recrutadores e gestores/engenheiros familiarizados com a função. Registrar contexto de cada participante e não tratar poucos participantes como estimativa estatística do mercado.

Tarefas representativas:

- Identificar especialidade e encontrar currículo/contato.
- Localizar um produto comercial Unity e explicar a atuação individual.
- Localizar um trabalho Flutter e distinguir sua organização e período.
- Encontrar Pathless por tecnologia Unity, sem conhecer a versão.
- Explicar uma decisão técnica de Read With Ello e uma limitação de Wallace.
- Distinguir o que é contribuição individual, contexto de produto e resultado comprovado.
- Voltar à Home sem perder o ponto de origem.

Medir conclusão, caminho, tempo, necessidade de ajuda e precisão da resposta. Definir a versão atual como linha de base antes de comparar alterações. Registrar explicitamente as respostas esperadas; tempo rápido com atribuição errada não é sucesso. Não estabelecer melhoria percentual sem dados nem usar o estudo para prometer contratação.

Para qualidade técnica, coletar separadamente reflow, leitor de tela, teclado, rede lenta, falhas de mídia e métricas de carregamento. Esses resultados não devem ser confundidos com a avaliação de conteúdo profissional.

## 12. Conclusão e decisões preservadas

O catálogo atual é uma boa apresentação para este inventário. Eu manteria a composição aprovada, a expansão abaixo das duas colunas, a mídia como complemento e os quatro estudos de caso como aprofundamento. Não vejo fundamento nesta revisão para trocar isso por carrossel, aumentar a densidade de tags ou redesenhar a identidade visual.

O perfil mostra experiência de produção e raciocínio técnico que merecem conversa. Para comunicar senioridade com mais força, a próxima iteração precisa destacar decisões e consequências verificáveis e tornar a descoberta por tecnologia mais previsível. Completar registros ajuda, mas a qualidade da curadoria e da evidência importa mais que preencher todos os campos.

Preservados neste parecer: cabeçalho e espaçamentos aprovados; entrelinha de 24px; mídia até 300px; Selected contributions como amostra; ausência de novos CTAs sem destino; limites de autoria; ausência de novo limite de largura sem decisão; decisões do usuário sobre controles de mídia. Recomendações são propostas para revisão posterior dos artefatos, não requisitos já aprovados.

### Arquivos que fundamentam observações locais

- `src/pages/index.astro`: estrutura e primeira leitura da Home.
- `src/pages/projects/index.astro`: filtros, busca, contador e main interno.
- `src/components/ProjectRecord.astro`: entrada, fatos, contribuição e expansão.
- `src/components/SupportingProject.astro`: título visualmente oculto no modo simple.
- `src/components/FeaturedProject.astro` e `CaseHero.astro`: composição e acesso aos casos.
- `src/data/projects.ts`, `cases.ts`, `experience.ts`, `testimonials.ts`: narrativas e consistência editorial.
- `src/layouts/BaseLayout.astro` e `Navigation.astro`: carregamento e retorno.
- `src/styles/global.css`: responsividade, espaçamento e largura de leitura.
- `specs/006-projects-catalog/evaluation.md`: resultados históricos e validações pendentes.

Fontes online foram consultadas em 2026-10-05 e estão vinculadas junto das afirmações correspondentes. Nenhum conteúdo do Notion foi editado ou considerado automaticamente atualizado nesta rodada.
