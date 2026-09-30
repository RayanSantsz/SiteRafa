import { ArrowDownRight, ArrowUpRight, BarChart3 } from 'lucide-react'

export function OutcomeCharts() {
  return (
    <section className="outcomes-section section-pad" id="resultados" aria-labelledby="outcomes-title">
      <div className="container-wide">
        <div className="outcomes-heading" data-reveal>
          <div>
            <p className="section-kicker">O QUE MUDA NA PRÁTICA</p>
            <h2 id="outcomes-title">Quando o financeiro ganha método, <em>o negócio respira.</em></h2>
          </div>
          <p>Uma leitura visual dos ganhos de organização que o acompanhamento financeiro pode trazer para a rotina.</p>
        </div>

        <div className="outcomes-grid">
          <figure className="outcome-card outcome-card-wide" data-reveal>
            <figcaption>
              <span className="outcome-index">01 / PREVISIBILIDADE</span>
              <strong>Fluxo de caixa mais visível</strong>
              <small>Menos surpresa no fim do mês.</small>
            </figcaption>
            <svg className="outcome-chart" viewBox="0 0 520 190" role="img" aria-label="Linha ilustrativa mostrando um fluxo de caixa mais estável com acompanhamento">
              <g className="chart-grid"><line x1="18" y1="34" x2="502" y2="34" /><line x1="18" y1="94" x2="502" y2="94" /><line x1="18" y1="154" x2="502" y2="154" /></g>
              <path className="chart-line chart-line-muted" d="M18 121 C56 82, 72 147, 110 105 S170 137, 202 98 S260 117, 292 82 S348 138, 382 96 S435 117, 502 72" />
              <path className="chart-line chart-line-main" d="M18 143 C72 136, 103 129, 151 130 S225 115, 273 112 S350 89, 400 91 S462 68, 502 60" />
              <circle className="chart-dot" cx="502" cy="60" r="5" />
              <text x="18" y="181">antes</text><text x="438" y="181">com método</text>
            </svg>
            <div className="outcome-legend"><span><i className="legend-stroke legend-stroke-muted" /> rotina sem leitura</span><span><i className="legend-stroke" /> acompanhamento</span></div>
          </figure>

          <figure className="outcome-card" data-reveal>
            <figcaption>
              <span className="outcome-index">02 / FOCO</span>
              <strong>Menos tempo em urgências</strong>
              <small>Mais energia para clientes e crescimento.</small>
            </figcaption>
            <div className="bar-chart" role="img" aria-label="Barras ilustrativas comparando mais urgências antes e menos urgências com rotina organizada">
              <div className="bar-group"><span className="bar bar-high" /><span className="bar-label">antes</span></div>
              <div className="bar-group"><span className="bar bar-mid" /><span className="bar-label">organização</span></div>
              <div className="bar-group"><span className="bar bar-low" /><span className="bar-label">acompanhamento</span></div>
            </div>
            <div className="outcome-direction"><ArrowDownRight size={18} aria-hidden="true" /> urgências perdem espaço</div>
          </figure>

          <figure className="outcome-card" data-reveal>
            <figcaption>
              <span className="outcome-index">03 / DECISÃO</span>
              <strong>Decisões baseadas em dados</strong>
              <small>Relatórios que apontam o próximo passo.</small>
            </figcaption>
            <div className="decision-visual" role="img" aria-label="Diagrama ilustrativo conectando rotina, indicadores e decisão">
              <span className="decision-node decision-node-one"><BarChart3 size={20} aria-hidden="true" /> rotina</span>
              <span className="decision-line decision-line-one" />
              <span className="decision-node decision-node-two"><BarChart3 size={20} aria-hidden="true" /> indicadores</span>
              <span className="decision-line decision-line-two" />
              <span className="decision-node decision-node-three"><ArrowUpRight size={20} aria-hidden="true" /> decisão</span>
            </div>
            <div className="outcome-direction"><ArrowUpRight size={18} aria-hidden="true" /> clareza para agir</div>
          </figure>
        </div>

        <p className="outcomes-note">Exemplos ilustrativos de evolução operacional. Os ganhos variam conforme o estágio e o volume de cada empresa.</p>
      </div>
    </section>
  )
}
