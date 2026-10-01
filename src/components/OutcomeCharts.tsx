import { ArrowDownRight, ArrowUpRight, BarChart3 } from 'lucide-react'

const herculesMonthly = [
  { month: 'Jan', y2025: 88_000, y2026: 315_000 },
  { month: 'Fev', y2025: 220_000, y2026: 317_000 },
  { month: 'Mar', y2025: 234_000, y2026: 667_000 },
  { month: 'Abr', y2025: 249_000, y2026: 557_516 },
  { month: 'Mai', y2025: 126_000, y2026: 602_520 },
  { month: 'Jun', y2025: 163_000, y2026: 246_100 },
  { month: 'Jul', y2025: 84_000, y2026: 971_430 },
  { month: 'Ago', y2025: 69_000, y2026: 645_806 },
] as const

const herculesReportedTotal2026 = 4_342_372
const herculesCumulative = herculesMonthly.reduce<{ month: string; y2025: number; y2026: number }[]>((result, point, index) => {
  const previous = result[index - 1]
  result.push({
    month: point.month,
    y2025: (previous?.y2025 ?? 0) + point.y2025,
    y2026: (previous?.y2026 ?? 0) + point.y2026,
  })
  return result
}, [])
const herculesMonthlyTotal2026 = herculesCumulative[herculesCumulative.length - 1].y2026

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
}).format(value)

const formatShortCurrency = (value: number) => value === 0 ? '0' : `${(value / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} mil`

const chartWidth = 760
const chartHeight = 300
const chartLeft = 58
const chartRight = 16
const chartTop = 22
const chartBottom = 48
const chartPlotWidth = chartWidth - chartLeft - chartRight
const chartPlotHeight = chartHeight - chartTop - chartBottom
const chartSlot = chartPlotWidth / herculesMonthly.length
const monthlyMax = 1_000_000
const cumulativeMax = 5_000_000
const monthlyTicks = [0, 250_000, 500_000, 750_000, 1_000_000]
const cumulativeTicks = [0, 1_000_000, 2_000_000, 3_000_000, 4_000_000, 5_000_000]

const chartX = (index: number) => chartLeft + chartSlot * index + chartSlot / 2
const chartY = (value: number, max: number) => chartTop + chartPlotHeight - (value / max) * chartPlotHeight
const makePath = (series: 'y2025' | 'y2026') => herculesCumulative.map((point, index) => `${index === 0 ? 'M' : 'L'} ${chartX(index)} ${chartY(point[series], cumulativeMax)}`).join(' ')

function HerculesCaseStudy() {
  return (
    <div className="hercules-case" data-reveal>
      <div className="hercules-case-head">
        <div>
          <p className="section-kicker section-kicker-light">CASE HÉRCULES · JAN–AGO</p>
          <h3>Uma evolução que aparece nos números, <em>mês após mês.</em></h3>
        </div>
        <p>Comparativo reportado de janeiro a agosto de 2025 contra o mesmo período de 2026, com vendas, volume cirúrgico e ticket médio.</p>
      </div>

      <div className="hercules-metrics" aria-label="Principais indicadores do case Hércules">
        <div className="hercules-metric"><strong>+252%</strong><span>vendas acumuladas</span><small>R$ 1,233 mi → R$ 4,342 mi</small></div>
        <div className="hercules-metric"><strong>+836%</strong><span>vendas em agosto</span><small>R$ 69 mil → R$ 645,8 mil</small></div>
        <div className="hercules-metric"><strong>+300%</strong><span>cirurgias em agosto</span><small>3 → 12 procedimentos</small></div>
        <div className="hercules-metric"><strong>+134%</strong><span>ticket médio em agosto</span><small>R$ 23 mil → R$ 53,8 mil</small></div>
        <div className="hercules-metric"><strong>+252%</strong><span>média mensal</span><small>R$ 154,1 mil → R$ 542,8 mil</small></div>
      </div>

      <div className="hercules-chart-grid">
        <figure className="hercules-chart-card">
          <figcaption><strong>Vendas por mês</strong><span>em R$</span></figcaption>
          <svg className="hercules-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Barras comparando as vendas mensais da Hércules em 2025 e 2026, de janeiro a agosto">
            {monthlyTicks.map((tick) => <g key={tick}><line className="hercules-chart-gridline" x1={chartLeft} x2={chartWidth - chartRight} y1={chartY(tick, monthlyMax)} y2={chartY(tick, monthlyMax)} /><text className="hercules-axis-label" x={chartLeft - 9} y={chartY(tick, monthlyMax) + 4} textAnchor="end">{formatShortCurrency(tick)}</text></g>)}
            {herculesMonthly.map((point, index) => {
              const x = chartX(index)
              const barWidth = Math.min(22, chartSlot * .22)
              const y2025 = chartY(point.y2025, monthlyMax)
              const y2026 = chartY(point.y2026, monthlyMax)
              return <g key={point.month}><rect className="hercules-bar-2025" x={x - barWidth - 3} y={y2025} width={barWidth} height={chartTop + chartPlotHeight - y2025} rx="3" /><rect className="hercules-bar-2026" x={x + 3} y={y2026} width={barWidth} height={chartTop + chartPlotHeight - y2026} rx="3" /><text className="hercules-value-label" x={x - barWidth / 2 - 3} y={y2025 - 7} textAnchor="middle">{formatShortCurrency(point.y2025)}</text><text className="hercules-value-label" x={x + barWidth / 2 + 3} y={y2026 - 7} textAnchor="middle">{formatShortCurrency(point.y2026)}</text><text className="hercules-axis-label" x={x} y={chartHeight - 20} textAnchor="middle">{point.month}</text></g>
            })}
          </svg>
          <div className="hercules-legend"><span><i />2025</span><span><i className="is-2026" />2026</span></div>
        </figure>

        <figure className="hercules-chart-card">
          <figcaption><strong>Vendas acumuladas</strong><span>em R$</span></figcaption>
          <svg className="hercules-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Linhas comparando as vendas acumuladas da Hércules em 2025 e 2026, de janeiro a agosto">
            {cumulativeTicks.map((tick) => <g key={tick}><line className="hercules-chart-gridline" x1={chartLeft} x2={chartWidth - chartRight} y1={chartY(tick, cumulativeMax)} y2={chartY(tick, cumulativeMax)} /><text className="hercules-axis-label" x={chartLeft - 9} y={chartY(tick, cumulativeMax) + 4} textAnchor="end">{formatShortCurrency(tick)}</text></g>)}
            <path className="hercules-line-2025" d={makePath('y2025')} />
            <path className="hercules-line-2026" d={makePath('y2026')} />
            {herculesCumulative.map((point, index) => <g key={point.month}><circle className="hercules-dot-2025" cx={chartX(index)} cy={chartY(point.y2025, cumulativeMax)} r="4" /><circle className="hercules-dot-2026" cx={chartX(index)} cy={chartY(point.y2026, cumulativeMax)} r="4" /><text className="hercules-axis-label" x={chartX(index)} y={chartHeight - 20} textAnchor="middle">{point.month}</text></g>)}
          </svg>
          <div className="hercules-legend"><span><i />2025 · {formatCurrency(herculesCumulative[herculesCumulative.length - 1].y2025)}</span><span><i className="is-2026" />2026 · {formatCurrency(herculesReportedTotal2026)} informado</span></div>
        </figure>
      </div>

      <p className="hercules-case-note">Dados fornecidos no material da Hércules. A soma dos oito meses detalhados em 2026 resulta em {formatCurrency(herculesMonthlyTotal2026)}, enquanto o total acumulado informado é {formatCurrency(herculesReportedTotal2026)} — confirme esse fechamento com a cliente antes da publicação.</p>
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

        <HerculesCaseStudy />

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
