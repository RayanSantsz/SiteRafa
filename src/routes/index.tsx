import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Clock3, Gauge, Menu, ShieldCheck, X } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { ContactForm } from '../components/ContactForm'
import { OutcomeCharts } from '../components/OutcomeCharts'
import { faqs, segments, services, steps, testimonials, whatsappUrl } from '../lib/content'

const siteUrl = 'https://sites.clubedotemplate.com.br/rafaela-silva-consultoria4/'
const heroImage = `${import.meta.env.BASE_URL}rafaela-hero.png`
const portraitImage = `${import.meta.env.BASE_URL}rafaela-portrait.png`
const directWhatsApp = whatsappUrl('Olá, Rafaela! Vim pelo site e gostaria de conversar sobre o financeiro da minha empresa.')

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Rafaela Almeida | BPO Financeiro e Gestão Estratégica para PMEs' },
      { name: 'description', content: 'Clareza financeira para crescer com segurança. BPO Financeiro, gestão estratégica e diagnóstico para pequenas e médias empresas em todo o Brasil.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Rafaela Almeida | Clareza financeira para crescer com segurança' },
      { property: 'og:description', content: 'Sua operação em ordem. Suas decisões com mais confiança. Conheça o BPO Financeiro e a Gestão Estratégica da Rafaela Almeida.' },
      { property: 'og:image', content: `${siteUrl}rafaela-hero.png` },
      { property: 'og:url', content: siteUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: siteUrl },
      { rel: 'preload', as: 'image', href: heroImage },
    ],
  }),
  component: Home,
})

export function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleAnchorNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link || link.target === '_blank') return

      const targetId = decodeURIComponent(link.hash.slice(1))
      const target = document.getElementById(targetId)
      if (!target) return

      event.preventDefault()
      setMenuOpen(false)
      if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash)

      // Wait for the mobile menu to close before measuring the fixed header.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0
          const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 18
          const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'auto' : 'smooth' })
        })
      })
    }

    document.addEventListener('click', handleAnchorNavigation)
    return () => document.removeEventListener('click', handleAnchorNavigation)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' })
    document.documentElement.classList.add('motion-ready')
    nodes.forEach((node) => observer.observe(node))
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready') }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className={`site-header ${scrolled || menuOpen ? 'site-header-scrolled' : ''}`}>
        <div className="header-inner container-wide">
          <a className="wordmark" href="#inicio" onClick={closeMenu} aria-label="Rafaela Almeida Consultoria Financeira, início"><span>RAFAELA ALMEIDA</span><small>CONSULTORIA FINANCEIRA</small></a>
          <nav className={`site-nav ${menuOpen ? 'site-nav-open' : ''}`} id="menu-principal" aria-label="Navegação principal">
            <a href="#servicos" onClick={closeMenu}>Serviços</a>
            <a href="#metodo" onClick={closeMenu}>Método</a>
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
            <a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
            <a className="mobile-nav-cta" href="#diagnostico" onClick={closeMenu}>Solicitar diagnóstico <ArrowUpRight size={17} aria-hidden="true" /></a>
          </nav>
          <a className="header-cta" href="#diagnostico">Solicitar diagnóstico <ArrowUpRight size={17} aria-hidden="true" /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="menu-principal" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25} /> : <Menu size={25} />}</button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img className="hero-image" src={heroImage} alt="Rafaela Almeida em seu ambiente de trabalho" fetchPriority="high" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-inner container-wide">
            <div className="hero-copy">
              <p className="hero-eyebrow"><span /> BPO FINANCEIRO &amp; GESTÃO ESTRATÉGICA</p>
              <h1 id="hero-title">Clareza financeira<br />para crescer com<br />segurança.</h1>
              <p className="hero-summary">Sua operação em ordem. Suas decisões com mais confiança.</p>
              <div className="hero-actions">
                <a className="button button-copper" href="#diagnostico">Solicitar diagnóstico <ArrowUpRight size={19} aria-hidden="true" /></a>
                <a className="hero-secondary" href={directWhatsApp} target="_blank" rel="noopener noreferrer">Falar no WhatsApp <ArrowRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-section section-pad" id="servicos" aria-labelledby="services-title">
          <div className="container-wide">
            <div className="section-heading intro-heading" data-reveal>
              <p className="section-kicker">O QUE FAZEMOS</p>
              <h2 id="services-title">O financeiro deixa de ocupar o seu dia. <em>Passa a orientar o próximo passo.</em></h2>
              <p>Da execução diária à leitura estratégica dos resultados, estruturamos uma operação financeira que acompanha o crescimento da sua empresa.</p>
            </div>
            <div className="services-list">
              {services.map((service) => (
                <article className="service-row" key={service.number} data-reveal>
                  <span className="service-number">{service.number}</span>
                  <div><h3>{service.title}</h3><span className="service-detail">{service.detail}</span></div>
                  <p>{service.description}</p>
                  <a href="#diagnostico" aria-label={`Solicitar diagnóstico para ${service.title}`}><ArrowUpRight size={23} strokeWidth={1.5} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
            <div className="secondary-services" data-reveal><span>Também apoiamos sua empresa com</span><p>Planejamento orçamentário <i /> Estruturação de processos <i /> Indicadores e relatórios gerenciais</p></div>
          </div>
        </section>

        <section className="benefits-section section-pad" id="beneficios" aria-labelledby="benefits-title">
          <div className="container-wide benefits-layout">
            <div className="benefits-intro" data-reveal><p className="section-kicker section-kicker-light">POR QUE FAZ DIFERENÇA</p><h2 id="benefits-title">Menos urgência na rotina.<br /><em>Mais clareza na decisão.</em></h2><p>O BPO tira a operação da sua mesa e devolve uma visão confiável do que entra, sai e precisa de atenção.</p><a className="text-link light-link" href="#diagnostico">Entenda seu cenário <ArrowUpRight size={18} aria-hidden="true" /></a></div>
            <div className="benefits-points" data-reveal>
              <div><span className="benefit-mark"><Check size={19} aria-hidden="true" /></span><h3>Rotina sob controle</h3><p>Contas, prazos e conciliação acompanhados com método.</p></div>
              <div><span className="benefit-mark"><Check size={19} aria-hidden="true" /></span><h3>Números que fazem sentido</h3><p>Fluxo de caixa, DRE e indicadores apresentados com clareza.</p></div>
              <div><span className="benefit-mark"><Check size={19} aria-hidden="true" /></span><h3>Tempo para o negócio</h3><p>Você foca em clientes, equipe e crescimento, com apoio financeiro próximo.</p></div>
            </div>
          </div>
        </section>

        <OutcomeCharts />

        <section className="clinic-owner-section section-pad" id="clinicas" aria-labelledby="clinic-owner-title">
          <div className="container-wide">
            <div className="clinic-owner-heading" data-reveal>
              <div><p className="section-kicker">PARA CLÍNICAS E CONSULTÓRIOS</p><h2 id="clinic-owner-title">Antes de contratar, <em>veja onde o dinheiro está escapando.</em></h2></div>
              <p>Uma conversa financeira precisa responder três perguntas: quanto entra, quanto fica e qual decisão aumenta sua margem.</p>
            </div>
            <div className="clinic-value-grid">
              <article className="clinic-value-card" data-reveal><span>01 / MARGEM</span><Gauge size={22} aria-hidden="true" /><h3>Descobrir o resultado por procedimento</h3><p>Separar receita, repasse, custo direto e despesa fixa para você parar de confundir faturamento com lucro.</p></article>
              <article className="clinic-value-card" data-reveal><span>02 / CAIXA</span><ShieldCheck size={22} aria-hidden="true" /><h3>Proteger o dinheiro sem perder o controle</h3><p>Organização, conferência e relatórios com a aprovação final sempre nas mãos da clínica.</p></article>
              <article className="clinic-value-card" data-reveal><span>03 / DECISÃO</span><Clock3 size={22} aria-hidden="true" /><h3>Agir antes que a margem desapareça</h3><p>Acompanhamento frequente para identificar custos, negociações e oportunidades enquanto ainda há tempo de corrigir.</p></article>
            </div>
            <div className="clinic-owner-trust" data-reveal><span><ShieldCheck size={17} aria-hidden="true" /> Sem acesso bancário para transferências</span><span><Gauge size={17} aria-hidden="true" /> Cenário financeiro antes da proposta</span><span><Clock3 size={17} aria-hidden="true" /> Diagnóstico inicial sem compromisso</span><a className="text-link" href="#diagnostico">Simular meu cenário <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className="method-section section-pad" id="metodo" aria-labelledby="method-title">
          <div className="container-wide">
            <div className="section-heading method-heading" data-reveal><p className="section-kicker">COMO COMEÇA</p><h2 id="method-title">Um caminho claro, do primeiro contato à operação rodando.</h2><p>Primeiro entendemos a realidade da sua empresa. Depois implantamos processos que fazem sentido para ela.</p></div>
            <ol className="steps-grid">
              {steps.map((step, index) => <li key={step.title} data-reveal><span className="step-index">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
            </ol>
            <p className="method-note" data-reveal>Implantação estimada em 5 a 10 dias úteis, conforme a operação.</p>
          </div>
        </section>

        <section className="control-section section-pad" id="controle" aria-labelledby="control-title">
          <div className="container-wide">
            <div className="control-top" data-reveal><div><p className="section-kicker">SEM PERDER O CONTROLE</p><h2 id="control-title">Você decide. <em>Rafaela organiza, prepara e confere.</em></h2></div><p>Terceirizar a rotina financeira mantém as decisões nas suas mãos e coloca a execução sob um processo seguro e acompanhado.</p></div>
            <div className="control-columns" data-reveal>
              <div className="control-column"><span className="control-label">SUA EMPRESA</span><h3>Aprova e decide</h3><ul><li>Autoriza pagamentos no banco</li><li>Define prioridades e investimentos</li><li>Acompanha caixa e relatórios</li><li>Dedica tempo a clientes e crescimento</li></ul></div>
              <div className="control-column control-column-highlight"><span className="control-label">RAFAELA ALMEIDA CONSULTORIA</span><h3>Organiza e executa</h3><ul><li>Confere notas, boletos e vencimentos</li><li>Lança e agenda contas no sistema</li><li>Concilia movimentações e apoia cobranças</li><li>Entrega DRE, caixa e relatórios</li></ul></div>
            </div>
            <p className="security-note" data-reveal><ShieldCheck size={23} strokeWidth={1.5} aria-hidden="true" /><span>O perfil de operador bancário não autoriza transferências. A aprovação final dos pagamentos permanece com você.</span></p>
          </div>
        </section>

        <section className="segments-section section-pad" id="segmentos" aria-labelledby="segments-title">
          <div className="container-wide segments-layout">
            <div data-reveal><p className="section-kicker">PARA QUEM É</p><h2 id="segments-title">Para quem cresceu e precisa enxergar o financeiro com nitidez.</h2><p>Atendemos pequenas e médias empresas que querem sair do improviso e ganhar previsibilidade para a próxima fase.</p></div>
            <ul className="segments-list" data-reveal>{segments.map((segment) => <li key={segment}><a href="#diagnostico" aria-label={`Mais informações para ${segment}`}><span>{segment}</span><ChevronRight size={19} aria-hidden="true" /></a></li>)}</ul>
          </div>
        </section>

        <section className="about-section section-pad" id="sobre" aria-labelledby="about-title">
          <div className="container-wide about-layout">
            <div className="about-photo" data-reveal><img src={portraitImage} loading="lazy" alt="Retrato de Rafaela Almeida, consultora financeira" /><div className="about-photo-caption"><strong>Rafaela Almeida</strong><span>Consultora Financeira &amp; BPO</span></div></div>
            <div className="about-copy" data-reveal><p className="section-kicker">QUEM ESTÁ À FRENTE</p><h2 id="about-title">Proximidade para cuidar da rotina. <em>Visão para apoiar suas decisões.</em></h2><p>Sou Rafaela Almeida, especialista em BPO Financeiro, Controladoria e Gestão Financeira Estratégica. Ajudo empresas a transformar rotinas desorganizadas em processos claros, previsíveis e acompanhados.</p><p>Acredito que nenhum empresário deve viver na incerteza do caixa. Com a operação estruturada e os números à vista, você ganha espaço para cuidar do que faz sua empresa crescer.</p><a className="text-link" href="#diagnostico">Converse comigo <ArrowUpRight size={19} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className="testimonials-section section-pad" id="depoimentos" aria-labelledby="testimonials-title">
          <div className="container-wide"><div className="section-heading testimonials-heading" data-reveal><p className="section-kicker">DEPOIMENTOS</p><h2 id="testimonials-title">Confiança construída no dia a dia.</h2></div><div className="testimonial-grid">{testimonials.map((testimonial, index) => <blockquote className={`testimonial ${index === 0 ? 'testimonial-featured' : ''}`} key={testimonial.name} data-reveal><span className="quote-mark" aria-hidden="true">“</span><p>{testimonial.quote}</p><footer><strong>{testimonial.name}</strong><span>{testimonial.context}</span></footer></blockquote>)}</div></div>
        </section>

        <section className="diagnostic-section section-pad" id="diagnostico" aria-labelledby="diagnostic-title">
          <div className="container-wide diagnostic-layout"><div className="diagnostic-copy" data-reveal><p className="section-kicker section-kicker-light">PRIMEIRO PASSO</p><h2 id="diagnostic-title">Antes de propor, <em>entendemos.</em></h2><p>Em uma conversa prática, avaliamos volume, custos, recebimentos e os gargalos que podem estar pressionando a margem da sua clínica.</p><ul><li><Check size={18} aria-hidden="true" /> Diagnóstico inicial sem compromisso</li><li><Check size={18} aria-hidden="true" /> Cenário financeiro antes da proposta</li><li><Check size={18} aria-hidden="true" /> Você continua aprovando os pagamentos</li></ul><a className="diagnostic-whatsapp" href={directWhatsApp} target="_blank" rel="noopener noreferrer">Prefere conversar direto? Chame no WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a></div><div data-reveal><ContactForm /></div></div>
        </section>

        <section className="faq-section section-pad" id="duvidas" aria-labelledby="faq-title">
          <div className="container-wide faq-layout"><div className="faq-intro" data-reveal><p className="section-kicker">DÚVIDAS FREQUENTES</p><h2 id="faq-title">Tudo mais claro antes de começar.</h2><p>As respostas para as perguntas que mais surgem sobre BPO e gestão financeira.</p><a className="text-link" href={directWhatsApp} target="_blank" rel="noopener noreferrer">Tenho outra dúvida <ArrowUpRight size={18} aria-hidden="true" /></a></div><Accordion type="single" collapsible className="faq-list" data-reveal>{faqs.map((faq, index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div>
        </section>

        <section className="closing-section" id="contato" aria-labelledby="closing-title"><div className="container-wide closing-inner" data-reveal><div><p className="section-kicker section-kicker-light">PRÓXIMO PASSO</p><h2 id="closing-title">Seu financeiro pode parar de depender do improviso.</h2></div><a className="button button-copper" href="#diagnostico">Solicitar diagnóstico <ArrowUpRight size={19} aria-hidden="true" /></a></div></section>
      </main>

      <footer className="site-footer"><div className="container-wide footer-grid"><div><a className="wordmark footer-wordmark" href="#inicio"><span>RAFAELA ALMEIDA</span><small>CONSULTORIA FINANCEIRA</small></a><p>BPO Financeiro e gestão estratégica para empresas que querem crescer com clareza.</p></div><div><h3>Contato</h3><a href="mailto:rafaelaalmeidasilva.gf@gmail.com">rafaelaalmeidasilva.gf@gmail.com</a><a href="tel:+5571981980556">(71) 98198-0556</a><p>Salvador, BA · Atendimento online em todo o Brasil</p></div><div><h3>Navegação</h3><a href="#servicos">Serviços</a><a href="#metodo">Método</a><a href="#sobre">Sobre Rafaela</a><a href="#duvidas">Dúvidas</a></div></div><div className="container-wide footer-bottom"><span>© {new Date().getFullYear()} Rafaela Almeida Consultoria Financeira.</span><span>Segunda a sexta, 08h às 18h</span></div></footer>
      <a className="floating-whatsapp" href={directWhatsApp} target="_blank" rel="noopener noreferrer" aria-label="Falar com Rafaela Almeida no WhatsApp"><span>WhatsApp</span><ArrowUpRight size={20} aria-hidden="true" /></a>
    </>
  )
}
