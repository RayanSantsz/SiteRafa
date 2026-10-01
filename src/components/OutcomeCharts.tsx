import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, BarChart3, CheckCircle2, Target } from 'lucide-react'

const herculesMonthly = [
  { month: 'Jan', y2025: 88_000, y2026: 315_000 },
  { month: 'Fev', y2025: 220_000, y2026: 317_000 },
  { month: 'Mar', y2025: 234_000, y2026: 667_000 },
  { month: 'Abr', y2025: 249_000, y2026: 577_516 },
  { month: 'Mai', y2025: 126_000, y2026: 602_520 },
  { month: 'Jun', y2025: 163_000, y2026: 246_100 },
  { month: 'Jul', y2025: 84_000, y2026: 971_430 },
  { month: 'Ago', y2025: 69_000, y2026: 645_806 },
] as const

const herculesReportedTotal2026 = 4_342_372
const herculesMarginScenarios = [
  { target: 20, revenue: 494_200, difference: 120_700, profit: 98_800 },
  { target: 30, revenue: 550_200, difference: 176_700, profit: 165_100 },
] as const
const herculesCumulative = herculesMonthly.reduce<{ month: string; y2025: number; y2026: number }[]>((result, point, index) => {
  const previous = result[index - 1]
  result.push({
    month: point.month,
    y2025: (previous?.y2025 ?? 0) + point.y2025,
    y2026: (previous?.y2026 ?? 0) + point.y2026,
  })
  return result
}, [])

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

function HerculesMarginSimulator() {
  const [target, setTarget] = useState<20 | 30>(20)
  const scenario = herculesMarginScenarios.find((item) => item.target === target) ?? herculesMarginScenarios[0]

  return (
    <div className="hercules-simulator">
      <div className="hercules-simulator-head">
        <div>
          <span className="hercules-subkicker">SIMULAÇÃO DE MARGEM · AGO/26</span>
          <h4>Quanto a operação precisa faturar para voltar a respirar?</h4>
          <p>Base real do mês: R$ 373,5 mil de receita, R$ 241,6 mil em custos variáveis e R$ 85,9 mil em despesas fixas.</p>
        </div>
        <div className="hercules-target-toggle" role="group" aria-label="Escolha a margem operacional desejada">
          {herculesMarginScenarios.map((item) => <button key={item.target} type="button" aria-pressed={target === item.target} className={target === item.target ? 'is-active' : ''} onClick={() => setTarget(item.target)}>{item.target}% de margem</button>)}
        </div>
      </div>
      <div className="hercules-simulator-result">
        <div><span>Receita atual</span><strong>R$ 373,5 mil</strong><small>margem de 6,7%</small></div>
        <div className="hercules-simulator-arrow" aria-hidden="true">→</div>
        <div className="is-highlight"><span>Receita necessária</span><strong>R$ {scenario.revenue.toLocaleString('pt-BR')}</strong><small>para {scenario.target}% de margem</small></div>
        <div className="hercules-simulator-delta"><strong>+ R$ {scenario.difference.toLocaleString('pt-BR')}</strong><span>de receita incremental</span><small>lucro operacional projetado: R$ {scenario.profit.toLocaleString('pt-BR')}</small></div>
      </div>
    </div>
  )
}

function HerculesCaseStudy() {
  return (
    <div className="hercules-case" data-reveal>
      <div className="hercules-case-head">
        <div>
          <p className="section-kicker section-kicker-light">CASE HÉRCULES · CIRURGIA PLÁSTICA · JAN–AGO/26</p>
          <h3>Mais vendas não bastam. <em>É preciso proteger a margem.</em></h3>
        </div>
        <p>Um recorte real de gestão: crescimento comercial, leitura de custos e prioridades definidas para transformar faturamento em caixa.</p>
      </div>

      <div className="hercules-metrics" aria-label="Principais indicadores do case Hércules">
        <div className="hercules-metric"><strong>+151,3%</strong><span>cirurgias fechadas</span><small>39 → 98 no acumulado</small></div>
        <div className="hercules-metric"><strong>+252%</strong><span>vendas acumuladas</span><small>R$ 1,233 mi → R$ 4,342 mi</small></div>
        <div className="hercules-metric"><strong>+40,2%</strong><span>ticket médio</span><small>R$ 31.615 → R$ 44.310</small></div>
        <div className="hercules-metric"><strong>42,9%</strong><span>conversão em agosto</span><small>12 fechamentos de 28 orçamentos</small></div>
        <div className="hercules-metric"><strong>+175,5%</strong><span>lucro operacional</span><small>R$ 1,094 mi · margem média 32,5%</small></div>
      </div>

      <div className="hercules-insight-grid">
        <article className="hercules-insight-card hercules-margin-card">
          <div className="hercules-insight-heading"><span className="hercules-subkicker">ALERTA DE MARGEM</span><strong>O faturamento reagiu. A margem precisou de proteção.</strong></div>
          <div className="hercules-margin-timeline" aria-label="Margem operacional de junho a agosto de 2026">
            <div><span>Jun</span><strong>19,9%</strong><i className="is-positive" /></div>
            <div><span>Jul</span><strong>-1,8%</strong><i className="is-negative" /></div>
            <div><span>Ago</span><strong>6,7%</strong><i className="is-recovering" /></div>
          </div>
          <p>Em julho, a clínica teve prejuízo operacional de R$ 5,7 mil. Em agosto voltou ao positivo, mas ainda abaixo da margem média do período.</p>
          <div className="hercules-insight-foot"><CheckCircle2 size={16} aria-hidden="true" /> A consultoria mostra onde o crescimento está virando resultado — e onde ainda não.</div>
        </article>

        <article className="hercules-insight-card hercules-funnel-card">
          <div className="hercules-insight-heading"><span className="hercules-subkicker">FUNIL COMERCIAL · AGO/26</span><strong>28 orçamentos trabalhados. 12 cirurgias fechadas.</strong></div>
          <div className="hercules-funnel"><div><strong>26</strong><span>primeiras consultas</span></div><div><strong>28</strong><span>orçamentos</span></div><div className="is-closed"><strong>12</strong><span>fechamentos</span></div></div>
          <div className="hercules-funnel-rate"><strong>42,9%</strong><span>taxa de conversão sobre orçamentos</span></div>
          <p>Outras 11 oportunidades seguiram em negociação. O próximo ganho pode estar no acompanhamento do funil, não apenas em gerar mais contatos.</p>
        </article>
      </div>

      <HerculesMarginSimulator />

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

      <div className="hercules-priorities">
        <div><span className="hercules-subkicker">PRÓXIMOS PASSOS DEFINIDOS</span><strong>O relatório termina com decisão, não só com gráfico.</strong></div>
        <ul>
          <li><Target size={16} aria-hidden="true" /> Recuperar a margem operacional para 20%.</li>
          <li><Target size={16} aria-hidden="true" /> Sustentar vendas acima da meta máxima.</li>
          <li><Target size={16} aria-hidden="true" /> Controlar custos variáveis, pessoal e marketing.</li>
          <li><Target size={16} aria-hidden="true" /> Estruturar novas oportunidades de receita.</li>
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
