export const whatsappNumber = '5571981980556'
export const whatsappUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

export const services = [
  {
    number: '01',
    title: 'BPO Financeiro',
    description: 'Assumimos a rotina de contas a pagar e receber, conciliação bancária, vencimentos e fluxo de caixa. Tudo organizado para você voltar a cuidar do negócio.',
    detail: 'A rotina em ordem, todos os dias.',
  },
  {
    number: '02',
    title: 'Gestão Financeira Estratégica',
    description: 'Analisamos receitas, custos, margens e indicadores para transformar os números da empresa em decisões mais seguras.',
    detail: 'Visão clara para decidir melhor.',
  },
  {
    number: '03',
    title: 'Diagnóstico Financeiro',
    description: 'Identificamos gargalos, riscos e oportunidades e apresentamos um plano de ação com prioridades para organizar a operação.',
    detail: 'Um ponto de partida concreto.',
  },
] as const

export const steps = [
  { title: 'Primeiro contato', text: 'Você nos conta como funciona seu financeiro. Agendamos uma conversa inicial sem compromisso.' },
  { title: 'Diagnóstico', text: 'Entendemos movimentações, recebimentos e gargalos antes de propor qualquer solução.' },
  { title: 'Implantação', text: 'Organizamos sistemas, plano de contas e fluxos de aprovação com a sua equipe.' },
  { title: 'Operação contínua', text: 'Executamos a rotina, entregamos relatórios e acompanhamos seus resultados.' },
] as const

export const segments = [
  'Serviços e consultorias',
  'Clínicas e saúde',
  'Beleza e estética',
  'Escritórios de advocacia',
  'Comércio e varejo',
  'PMEs em expansão',
] as const

export const testimonials = [
  {
    quote: 'Ter a Rafaela cuidando do financeiro da minha clínica foi um divisor de águas. Parei de perder horas com conciliação e hoje sei exatamente minha margem de lucro por procedimento.',
    name: 'Dra. Camila Nogueira',
    context: 'Clínica Integrada de Saúde',
  },
  {
    quote: 'Profissionalismo impecável. O controle de honorários e o fluxo de caixa do nosso escritório de advocacia ficaram 100% organizados e no prazo.',
    name: 'Dr. Marcelo Ramos',
    context: 'Ramos & Associados Advocacia',
  },
  {
    quote: 'A régua de cobrança e a gestão de contas a pagar reduziram nossa inadimplência em pouquíssimo tempo. Não abro mão dessa parceria.',
    name: 'Juliana Vasconcelos',
    context: 'Studio & Espaço de Beleza',
  },
] as const

export const faqs = [
  { question: 'O BPO Financeiro substitui o meu contador?', answer: 'Não. A contabilidade continua responsável pelas obrigações contábeis e fiscais. O BPO cuida da rotina financeira da empresa e organiza as informações que também apoiam o trabalho contábil.' },
  { question: 'Em quanto tempo a operação começa a rodar?', answer: 'A implantação costuma levar de 5 a 10 dias úteis, conforme o volume de movimentações, os sistemas usados e o estado atual dos processos.' },
  { question: 'Quem aprova os pagamentos e movimenta o dinheiro?', answer: 'A decisão e a autorização final permanecem com você. Rafaela organiza, confere e agenda as operações com perfil de operador, sem permissão para autorizar transferências.' },
  { question: 'Meu financeiro está desorganizado. Posso contratar?', answer: 'Sim. O diagnóstico inicial ajuda a entender os problemas e a definir por onde começar a organização da rotina.' },
  { question: 'Qual é a diferença entre BPO e gestão estratégica?', answer: 'O BPO executa e organiza a rotina financeira. A gestão estratégica interpreta os números, acompanha indicadores e apoia decisões de crescimento.' },
  { question: 'Quanto custa o serviço?', answer: 'A proposta é personalizada depois do diagnóstico, considerando o volume de movimentações, a complexidade da operação e o apoio necessário.' },
] as const
