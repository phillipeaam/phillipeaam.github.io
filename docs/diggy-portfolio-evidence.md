# Diggy — base factual da ficha

Atualização editorial: 2026-10-06, branch `feature/006-projects-catalog`.

Fonte: [Diggy the Dog — auditoria para Phillipe Augusto](E:/diggy-the-dog-report-phillipe-augusto.md), documento 2.1.0, baseline `edc78f992941d42c315eab34089fe0bd9c9bf50e` + estado local. Relatório fornecido pelo usuário; esta revisão não refez a auditoria do jogo.

## Comparação para posicionamento profissional

O relatório é uma base factual mais precisa que a ficha anterior: discrimina autoria por diffs, identifica o contexto de equipe e jam e separa implementação histórica de manutenção e mudanças locais. A ficha anterior atribuía movimento genericamente e descrevia início/fim e distância sem delimitar as implementações. O relatório permite explicar atuação e mecanismos concretos, favorecendo a apresentação como projeto de apoio para gameplay engineering.

O [estudo editorial da branch](projects-catalog-hiring-review.md) continua orientando a apresentação: produto compreensível, atuação individual e destaques técnicos na seção Selected contributions. A auditoria complementa esse estudo com evidências específicas do jogo. Esta comparação não demonstra aumento de entrevistas nem validação com recrutadores.

## Claims adotados

Recorte editorial solicitado pelo usuário: apenas a jam de 23–26 de abril de 2021, com datas explícitas no período da ficha. A ficha prioriza perseguição/desfecho, geração de obstáculos e feedback de distância. Ajustes menores e manutenção posterior ficam fora do conteúdo público; a data desta revisão documental não representa o período de desenvolvimento exibido.

| Conteúdo da ficha | Evidência no relatório | Limite preservado |
| --- | --- | --- |
| Perseguição subterrânea, cachorro/toupeira e obstáculos; equipe da Ludum Dare 48 | E-001, E-002; C-001 | Contexto documental; sem ranking ou resultado da jam |
| Lógica inicial da toupeira e gatilhos de partida/desfecho | K-001, E-003; commits `0d584df`, `218ef6d` | Integração com movimento existente da equipe; sem autoria do movimento completo |
| Gerador aleatório de obstáculos | K-002, E-004; commit `71bc881` | Algoritmo histórico testa pontos em colliders; sem garantia de separação ou rota jogável |
| Exibição de distância com TMP | K-003, E-005; commits `3fc5c23`, `b2878fb` | Sem métrica de impacto |

Corredor protegido, limite de candidatos e retorno ao menu nas mudanças locais de 2026 não foram atribuídos a Phillipe: o relatório mantém autoria local desconhecida e validação incompleta. Não foram adotados duração de 34 segundos, garantia de rotas, ganhos de desempenho ou correspondência entre fonte atual e build pública.

A ficha usa Unity sem especificar uma versão posterior à jam. A mídia já autorizada no catálogo conserva seu registro próprio em `specs/006-projects-catalog/evaluation.md`; esta revisão textual não estabelece a versão da build mostrada.

## Consequências funcionais nos destaques

Revisão baseada nas seções Sistemas e arquitetura e R-001 do relatório: explicitar início da toupeira, vitória por contato com Player e derrota pelo gatilho de fim; layouts de obstáculos variáveis pela amostragem aleatória; distância restante visível pelo contador TMP. São descrições de funcionamento sustentadas pela fonte, sem métricas de benefício ou nova validação da build pública. A ressalva do spawner preserva a ordem histórica de teste do ponto antes de escala/rotação.

## Contexto pessoal fornecido pelo usuário

Refinamento técnico posterior: o destaque de perseguição explicita a extensão da parada do jogador sustentada por K-001/E-003, sem atribuir a criação do controle de movimento a Phillipe. O destaque do spawner distingue teste de ponto em bounds e footprint final, conforme F-002/R-001, preservando o algoritmo histórico de 2021.

O usuário relatou que, em meio ao trabalho, a equipe reservou duas noites para fazer o jogo e se divertir, corrigindo a referência inicial a uma noite. Esse relato sustenta a abertura narrativa. A sequência de movimento existente por Thiago seguida das regras de perseguição e feedback de Phillipe vem de K-001/K-003 e F-001 do relatório. A hipótese de assumir tarefas especificamente por falta de tempo não foi tratada como fato, pois o usuário a apresentou de forma tentativa e o relatório não estabelece essa motivação.

O usuário acrescentou o contexto da concepção coletiva: ao discutir o tema, um membro sugeriu uma toupeira por cavar profundamente; outro propôs um cachorro perseguindo-a. A conversa levou à premissa de um cachorro cavando sob seu jardim para alcançar a toupeira que havia entrado nele. O tema “Deeper and deeper” está registrado no relatório; a conversa e a motivação da premissa são relato pessoal do usuário. Não foram atribuídas essas sugestões a membros específicos nem autoria exclusiva da ideia a Phillipe.
