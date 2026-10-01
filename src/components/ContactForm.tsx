import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'
import { whatsappUrl } from '../lib/content'

type FieldName = 'nome' | 'telefone' | 'email' | 'empresa' | 'segmento' | 'faturamento' | 'consentimento'
type Errors = Partial<Record<FieldName, string>>

const revenueLabels: Record<string, string> = {
  ate_20k: 'Até R$ 20 mil/mês',
  '20k_50k': 'R$ 20 mil a R$ 50 mil/mês',
  '50k_100k': 'R$ 50 mil a R$ 100 mil/mês',
  '100k_300k': 'R$ 100 mil a R$ 300 mil/mês',
  acima_300k: 'Acima de R$ 300 mil/mês',
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function FieldError({ id, error }: { id: FieldName; error?: string }) {
  return <span id={`${id}-erro`} className="field-error" role={error ? 'alert' : undefined}>{error}</span>
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'opening' | 'opened' | 'blocked'>('idle')
  const [fallbackUrl, setFallbackUrl] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'opening') return
    const form = formRef.current
    if (!form) return
    const data = new FormData(form)
    if (String(data.get('website_url') ?? '').trim()) {
      form.reset()
      setPhone('')
      return
    }

    const values = {
      nome: String(data.get('nome') ?? '').trim(),
      telefone: String(data.get('telefone') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      empresa: String(data.get('empresa') ?? '').trim(),
      segmento: String(data.get('segmento') ?? ''),
      faturamento: String(data.get('faturamento') ?? ''),
      consentimento: data.get('consentimento') === 'on',
    }
    const next: Errors = {}
    if (!values.nome) next.nome = 'Informe seu nome.'
    if (values.telefone.replace(/\D/g, '').length < 10) next.telefone = 'Informe um WhatsApp com DDD.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Informe um e-mail válido.'
    if (!values.empresa) next.empresa = 'Informe sua empresa.'
    if (!values.segmento) next.segmento = 'Selecione o segmento.'
    if (!values.faturamento) next.faturamento = 'Selecione a faixa de faturamento.'
    if (!values.consentimento) next.consentimento = 'Autorize o contato para continuar.'
    setErrors(next)
    const firstError = Object.keys(next)[0] as FieldName | undefined
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus()
      return
    }

    const message = [
      'Olá, Rafaela! Solicitei um Diagnóstico Financeiro pelo site:',
      '',
      `Nome: ${values.nome}`,
      `Empresa: ${values.empresa}`,
      `Segmento: ${values.segmento}`,
      `Faturamento: ${revenueLabels[values.faturamento] ?? values.faturamento}`,
      `WhatsApp: ${values.telefone}`,
      `E-mail: ${values.email}`,
      '',
      'Gostaria de agendar a apresentação do diagnóstico da minha empresa.',
    ].join('\n')
    const url = whatsappUrl(message)
    setFallbackUrl(url)
    setStatus('opening')
    const opened = window.open(url, '_blank')
    if (opened) {
      opened.opener = null
      form.reset()
      setPhone('')
      window.setTimeout(() => setStatus('opened'), 350)
    } else {
      setStatus('blocked')
    }
  }

  return (
    <form ref={formRef} className="lead-form" onSubmit={submit} noValidate aria-label="Solicitar diagnóstico financeiro">
      <div className="form-heading">
        <span className="section-kicker">PRIMEIRO PASSO</span>
        <h3>Vamos entender onde sua operação perde margem.</h3>
        <p>Conte um pouco sobre sua empresa. Você recebe uma leitura inicial antes de decidir qualquer contratação.</p>
        <div className="form-reassurance"><span><ShieldCheck size={15} aria-hidden="true" /> Sem acesso bancário</span><span><Clock3 size={15} aria-hidden="true" /> Retorno em até 1 dia útil</span></div>
      </div>
      <div className="form-grid">
        <label className="field" htmlFor="nome"><span>Seu nome *</span><input id="nome" name="nome" autoComplete="name" placeholder="Como podemos chamar você?" aria-invalid={!!errors.nome} aria-describedby="nome-erro" /><FieldError id="nome" error={errors.nome} /></label>
        <label className="field" htmlFor="telefone"><span>WhatsApp *</span><input id="telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(71) 99999-9999" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} aria-invalid={!!errors.telefone} aria-describedby="telefone-erro" /><FieldError id="telefone" error={errors.telefone} /></label>
        <label className="field" htmlFor="email"><span>E-mail corporativo *</span><input id="email" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" aria-invalid={!!errors.email} aria-describedby="email-erro" /><FieldError id="email" error={errors.email} /></label>
        <label className="field" htmlFor="empresa"><span>Nome da empresa *</span><input id="empresa" name="empresa" autoComplete="organization" placeholder="Sua empresa" aria-invalid={!!errors.empresa} aria-describedby="empresa-erro" /><FieldError id="empresa" error={errors.empresa} /></label>
        <label className="field" htmlFor="segmento"><span>Segmento *</span><select id="segmento" name="segmento" defaultValue="" aria-invalid={!!errors.segmento} aria-describedby="segmento-erro"><option value="" disabled>Selecione o segmento</option><option>Prestação de Serviços / Consultoria</option><option>Saúde, Clínicas e Consultórios</option><option>Beleza, Estética e Spas</option><option>Escritório de Advocacia</option><option>Comércio e Varejo</option><option>Outro Segmento</option></select><FieldError id="segmento" error={errors.segmento} /></label>
        <label className="field" htmlFor="faturamento"><span>Faturamento mensal *</span><select id="faturamento" name="faturamento" defaultValue="" aria-invalid={!!errors.faturamento} aria-describedby="faturamento-erro"><option value="" disabled>Selecione a faixa</option><option value="ate_20k">Até R$ 20 mil / mês</option><option value="20k_50k">R$ 20 mil a R$ 50 mil / mês</option><option value="50k_100k">R$ 50 mil a R$ 100 mil / mês</option><option value="100k_300k">R$ 100 mil a R$ 300 mil / mês</option><option value="acima_300k">Acima de R$ 300 mil / mês</option></select><FieldError id="faturamento" error={errors.faturamento} /></label>
      </div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website_url">Deixe este campo vazio</label><input id="website_url" name="website_url" tabIndex={-1} autoComplete="off" /></div>
      <div className="consent-wrap"><label className="consent" htmlFor="consentimento"><input id="consentimento" name="consentimento" type="checkbox" aria-invalid={!!errors.consentimento} aria-describedby="consentimento-erro" /><span>Autorizo a Rafaela Almeida Consultoria a entrar em contato via WhatsApp e e-mail sobre este diagnóstico.</span></label><FieldError id="consentimento" error={errors.consentimento} /></div>
      <button className="button button-primary form-submit" type="submit" disabled={status === 'opening'}>{status === 'opening' ? 'Abrindo WhatsApp...' : 'Solicitar diagnóstico'}<ArrowUpRight size={18} aria-hidden="true" /></button>
      <p className="form-note">O formulário prepara sua mensagem. O envio é concluído por você no WhatsApp.</p>
      {status === 'opened' && <p className="form-status" role="status"><CheckCircle2 size={18} aria-hidden="true" /> WhatsApp aberto. Envie a mensagem para concluir sua solicitação.</p>}
      {status === 'blocked' && <p className="form-status form-status-error" role="alert">O navegador bloqueou a nova janela. <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">Abra sua mensagem no WhatsApp</a>.</p>}
    </form>
  )
}
