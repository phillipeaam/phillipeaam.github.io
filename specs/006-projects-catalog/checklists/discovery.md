# Descoberta e UX — Checklist: Catálogo de Projetos

**Purpose**: Avaliar se os requisitos de descoberta do catálogo estão completos, claros, consistentes e mensuráveis antes da implementação.
**Created**: 2026-10-04
**Feature**: [spec.md](../spec.md)

**Note**: Este checklist personalizado foi gerado por `$speckit-checklist` a partir do contexto e dos requisitos da feature.
**Review Ownership**: Este artefato de qualidade de requisitos pertence à pessoa revisora. Marque `[x]` somente quando ela considerar satisfeito o critério de qualidade do requisito.
**Marker Semantics**: `[x]` significa que o critério foi revisado e satisfeito quanto à qualidade dos requisitos; não significa que a implementação foi concluída.

## Completude dos requisitos

- [x] CHK001 — Os sinais mínimos visíveis em cada entrada estão definidos separadamente dos detalhes sob demanda, inclusive para projetos sem contribuição, período ou tecnologia confirmados? [Completude, Spec §FR-001–FR-003]
- [x] CHK002 — A origem e a regra de validação dos valores disponíveis em Context e Technology estão explícitas o bastante para impedir opções inferidas ou não verificadas? [Completude, Spec §FR-006, §Assumptions]
- [x] CHK003 — O escopo do corpus pesquisável esclarece quais metadados públicos entram na busca e exclui conteúdo interno ou adiado? [Completude, Spec §FR-004, §Assumptions]
- [x] CHK004 — Os requisitos distinguem claramente contexto profissional, tipo de produto e tecnologia, inclusive quando categorias editoriais atuais possam sugerir uma classificação incorreta? [Completude, Spec §FR-003, §Key Entities]

## Clareza e consistência

- [x] CHK005 — A normalização da consulta define sem ambiguidade o tratamento de caixa, espaços laterais, acentos e correspondência parcial? [Clareza, Spec §FR-004–FR-005, §Edge Cases]
- [x] CHK006 — A regra OR dentro de cada faceta e AND entre consulta/facetas está consistente entre requisitos e cenários de aceitação? [Consistência, Spec §FR-007, §User Story 2]
- [x] CHK007 — A definição de total não filtrado, quantidade correspondente e unidade contada (projetos) é consistente em todas as mensagens e critérios? [Clareza, Spec §FR-008, §SC-004]
- [x] CHK008 — A regra para deep links a projetos ocultos por filtros está especificada de forma consistente na spec, no plano e no contrato da interface? [Consistência, Spec §FR-012, §Edge Cases; Plan §Planning Decisions]
- [x] CHK009 — Os requisitos deixam claro se mudanças de consulta/facetas preservam a ordem editorial e como grupos sem resultados afetam a apresentação? [Clareza, Spec §Assumptions, §Edge Cases]

## Qualidade dos critérios de aceitação

- [x] CHK010 — Os critérios de exatidão da busca e das facetas identificam uma matriz representativa suficiente de nomes, metadados, acentos, seleções múltiplas e combinações AND/OR? [Mensurabilidade, Spec §SC-002–SC-003]
- [x] CHK011 — Os critérios responsivos nomeiam larguras representativas e definem objetivamente o que conta como perda de conteúdo ou rolagem horizontal indesejada? [Mensurabilidade, Spec §SC-007, §FR-017]

## Cobertura de cenários e limites

- [x] CHK012 — Há requisitos suficientes para busca vazia, espaços, nenhum resultado, remoção individual de filtros e restauração do catálogo completo? [Cobertura, Spec §FR-009–FR-010, §Edge Cases]
- [x] CHK013 — O comportamento de detalhes quando um projeto deixa de corresponder está claro, incluindo a possibilidade de vários detalhes permanecerem abertos simultaneamente? [Cobertura, Spec §FR-011, §User Story 3]
- [x] CHK014 — O comportamento de projetos sem mídia, detalhes, case ou destino externo está definido sem exigir placeholders ou CTAs vazios? [Cobertura, Spec §FR-012–FR-013, §Edge Cases]
- [x] CHK015 — Os limites de provenance de mídia, fallback estático e pausa de movimento contínuo estão definidos para todas as situações animadas no escopo? [Cobertura, Spec §FR-013–FR-014]
- [x] CHK016 — O requisito sem JavaScript distingue claramente conteúdo e navegação essenciais das funções de busca/filtro que podem ficar indisponíveis? [Resiliência, Spec §FR-016, §User Story 4]

## Requisitos não funcionais e pressupostos

- [x] CHK017 — As necessidades de teclado, foco visível, rótulos, anúncio de estado, toque, leitores de tela e movimento reduzido estão cobertas sem depender de hover ou animação? [Acessibilidade, Spec §FR-014–FR-017, §SC-006]
- [x] CHK018 — O pressuposto do inventário atual de 19 projetos está conciliado com a exigência de que total e opções de filtro acompanhem futuras alterações no arquivo? [Pressuposto, Spec §SC-001, §Assumptions]
- [x] CHK019 — Os limites editoriais — fatos verificados, quatro cases existentes, ações válidas, IDs e ausência de novos dados/mídia — estão rastreáveis e sem conflito com a preservação do catálogo? [Consistência, Spec §FR-002, §FR-012–FR-013, §Assumptions]

## Notes

- Os itens avaliam a qualidade do que foi especificado, não o funcionamento ou a conclusão da implementação.
- Marque `[x]` somente após a revisão de cada critério de qualidade; deixe pendências sem marcar.
- `$speckit-implement` pode ler o estado deste checklist como gate e não deve alterar seus marcadores.
- [Checklist de qualidade da spec](requirements.md) tem ciclo próprio mantido por `$speckit-specify` e `$speckit-clarify`.
