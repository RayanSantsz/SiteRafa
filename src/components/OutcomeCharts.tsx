import { ArrowDownRight, ArrowUpRight, BarChart3, Target } from 'lucide-react'

// O case usa comparação relativa para manter os dados específicos do cliente fora da página pública.
const caseMonthly = [
  { month: 'Jan', baseline: 10, current: 28 },
  { month: 'Fev', baseline: 24, current: 29 },
  { month: 'Mar', baseline: 26, current: 56 },
  { month: 'Abr', baseline: 28, current: 49 },
  { month: 'Mai', baseline: 14, current: 51 },
  { month: 'Jun', baseline: 18, current: 22 },
  { month: 'Jul', baseline: 9, current: 82 },
  { month: 'Ago', baseline: 8, current: 55 },
] as const

const caseCumulative = caseMonthly.reduce<{ month: string; baseline: number; current: number }[]>((result, point, index) => {
  const previous = result[index - 1]
  result.push({
    month: point.month,
    baseline: (previous?.baseline ?? 0) + point.baseline,
    current: (previous?.current ?? 0) + point.current,
  })
  return result
}, [])

const chartWidth = 760
const chartHeight = 300
const chartLeft = 24
const chartRight = 16
const chartTop = 22
const chartBottom = 48
const chartPlotWidth = chartWidth - chartLeft - chartRight
const chartPlotHeight = chartHeight - chartTop - chartBottom
const chartSlot = chartPlotWidth / caseMonthly.length
const monthlyMax = 100
const cumulativeMax = 360
const chartTicks = [0, 25, 50, 75, 100]

const chartX = (index: number) => chartLeft + chartSlot * index + chartSlot / 2
const chartY = (value: number, max: number) => chartTop + chartPlotHeight - (value / max) * chartPlotHeight
const makePath = (series: 'baseline' | 'current') => caseCumulative.map((point, index) => `${index === 0 ? 'M' : 'L'} ${chartX(index)} ${chartY(point[series], cumulativeMax)}`).join(' ')

function CaseStudy() {
  return (
    <div className="hercules-case" data-reveal>
      <div className="hercules-case-head">
        <div>
          <p className="section-kicker section-kicker-light">CASE DE CRESCIMENTO · CLÍNICA · 2025–2026</p>
          <h3>Mais clareza para decidir. <em>Mais consistência para crescer.</em></h3>
        </div>
        <p>Uma leitura anonimizada de evolução operacional: rotina organizada, acompanhamento dos indicadores e decisões tomadas com mais contexto.</p>
      </div>

      <div className="hercules-metrics" aria-label="Indicadores resumidos de um case de crescimento">
        <div className="hercules-metric"><strong>+151%</strong><span>procedimentos fechados</span></div>
        <div className="hercules-metric"><strong>+252%</strong><span>crescimento acumulado</span></div>
        <div className="hercules-metric"><strong>+40%</strong><span>ticket médio</span></div>
        <div className="hercules-metric"><strong>43%</strong><span>conversão comercial</span></div>
        <div className="hercules-metric"><strong>+176%</strong><span>resultado operacional</span></div>
      </div>

      <div className="hercules-readout">
        <div className="hercules-readout-intro">
          <span className="hercules-subkicker">LEITURA DO CASE</span>
          <strong>O ganho aparece quando a rotina deixa de depender do improviso.</strong>
          <p>O acompanhamento organiza o presente e cria uma base segura para o próximo movimento.</p>
        </div>
        <div className="hercules-readout-list">
          <article className="hercules-readout-item"><span>01</span><strong>Organizar</strong><p>Processos claros para a operação.</p></article>
          <article className="hercules-readout-item"><span>02</span><strong>Acompanhar</strong><p>Indicadores que mostram o cenário.</p></article>
          <article className="hercules-readout-item"><span>03</span><strong>Decidir</strong><p>Próximos passos com contexto.</p></article>
        </div>
      </div>

      <div className="hercules-chart-grid">
        <figure className="hercules-chart-card">
          <figcaption><strong>Vendas por mês</strong><span>comparação relativa</span></figcaption>
          <svg className="hercules-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Barras comparando a evolução mensal entre dois períodos">
            {chartTicks.map((tick) => <line key={tick} className="hercules-chart-gridline" x1={chartLeft} x2={chartWidth - chartRight} y1={chartY(tick, monthlyMax)} y2={chartY(tick, monthlyMax)} />)}
            {caseMonthly.map((point, index) => {
              const x = chartX(index)
              const barWidth = Math.min(24, chartSlot * .22)
              const baselineY = chartY(point.baseline, monthlyMax)
              const currentY = chartY(point.current, monthlyMax)
              return <g key={point.month}><rect className="hercules-bar-2025" x={x - barWidth - 3} y={baselineY} width={barWidth} height={chartTop + chartPlotHeight - baselineY} rx="3" /><rect className="hercules-bar-2026" x={x + 3} y={currentY} width={barWidth} height={chartTop + chartPlotHeight - currentY} rx="3" /><text className="hercules-axis-label" x={x} y={chartHeight - 20} textAnchor="middle">{point.month}</text></g>
            })}
          </svg>
          <div className="hercules-legend"><span><i />período anterior</span><span><i className="is-2026" />período acompanhado</span></div>
        </figure>

        <figure className="hercules-chart-card">
          <figcaption><strong>Evolução acumulada</strong><span>comparação relativa</span></figcaption>
          <svg className="hercules-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Linhas comparando a evolução acumulada entre dois períodos">
            {chartTicks.map((tick) => <line key={tick} className="hercules-chart-gridline" x1={chartLeft} x2={chartWidth - chartRight} y1={chartY(tick * 3.6, cumulativeMax)} y2={chartY(tick * 3.6, cumulativeMax)} />)}
            <path className="hercules-line-2025" d={makePath('baseline')} />
            <path className="hercules-line-2026" d={makePath('current')} />
            {caseCumulative.map((point, index) => <g key={point.month}><circle className="hercules-dot-2025" cx={chartX(index)} cy={chartY(point.baseline, cumulativeMax)} r="4" /><circle className="hercules-dot-2026" cx={chartX(index)} cy={chartY(point.current, cumulativeMax)} r="4" /><text className="hercules-axis-label" x={chartX(index)} y={chartHeight - 20} textAnchor="middle">{point.month}</text></g>)}
          </svg>
          <div className="hercules-legend"><span><i />período anterior</span><span><i className="is-2026" />período acompanhado</span></div>
        </figure>
      </div>

      <div className="hercules-priorities">
        <div><span className="hercules-subkicker">PRÓXIMAS DECISÕES</span><strong>Crescimento saudável pede prioridades visíveis.</strong></div>
        <ul>
          <li><Target size={16} aria-hidden="true" /> Proteger a margem.</li>
          <li><Target size={16} aria-hidden="true" /> Reduzir ruídos operacionais.</li>
          <li><Target size={16} aria-hidden="true" /> Acompanhar custos e conversão.</li>
          <li><Target size={16} aria-hidden="true" /> Transformar dados em ação.</li>
        </ul>
      </div>
    </div>
  )
}

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

        <CaseStudy />

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
