import { Module, FaqItem } from './types';
import { Video, Clapperboard, Sparkles, Zap, DollarSign, Users, Bot, Workflow, Database, MessageSquare, BarChart3, Lock, Server, Smartphone, BrainCircuit } from 'lucide-react';

export const HERO_HEADLINE = "Automação Inteligente para seu Negócio";
export const HERO_SUBHEADLINE = "Atenda clientes 24h, agende reuniões e venda mais pelo WhatsApp. Tenha um funcionário digital trabalhando por você, sem pagar mensalidades caras de software.";

// Módulos agora focados na SOLUÇÃO DO PROBLEMA do cliente
export const MODULES: Module[] = [
  {
    title: "Corretor Virtual 24h",
    description: "Para Imobiliárias: Atende leads do Zap/OLX em segundos. Descobre o orçamento do cliente e agenda a visita sozinho. Você só recebe o cliente pronto para comprar.",
    icon: "Lock"
  },
  {
    title: "Secretária de Clínicas",
    description: "Para Médicos e Dentistas: Responde dúvidas sobre procedimentos, consulta sua agenda e marca horários. Envia lembretes para o paciente não faltar.",
    icon: "MessageSquare"
  },
  {
    title: "Atendente de Delivery",
    description: "Para Restaurantes: Anota pedidos pelo WhatsApp (texto ou áudio), calcula o valor total e envia direto para a cozinha. Fim dos erros na anotação.",
    icon: "Smartphone"
  },
  {
    title: "Sem Mensalidade de Software",
    description: "Diferente de sistemas tradicionais, aqui você não paga aluguel eterno. O sistema é instalado para você e passa a ser propriedade da sua empresa.",
    icon: "DollarSign"
  },
  {
    title: "Inteligência Real (IA)",
    description: "Não usamos aquelas respostas prontas 'robóticas'. Nossa IA entende o que o cliente diz e responde de forma natural, educada e humana.",
    icon: "BrainCircuit"
  },
  {
    title: "WhatsApp Integrado",
    description: "Funciona direto no seu número atual ou em um novo. Envia áudios, fotos e arquivos como se fosse uma pessoa real conversando.",
    icon: "Workflow"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Meu WhatsApp pode ser bloqueado?",
    answer: "Trabalhamos com segurança total. Nosso sistema simula o comportamento humano: digita devagar, espera para responder e age com naturalidade. Não fazemos disparos em massa (spam), focamos em atender bem quem te procura."
  },
  {
    question: "Tenho que pagar todo mês?",
    answer: "Não pelo software. Você paga a instalação (Setup) uma única vez. Depois, terá apenas um custo minúsculo de manutenção do servidor (cerca de R$ 40 mensais) para manter o robô ligado 24h."
  },
  {
    question: "Como funciona a 'Auditoria'?",
    answer: "Nós testamos seu atendimento atual como se fôssemos um cliente oculto. Se demorar para responder, mostramos quanto dinheiro você está perdendo e como nossa automação resolve isso instantaneamente."
  },
  {
    question: "Preciso entender de tecnologia?",
    answer: "Zero. Nós entregamos tudo pronto ('Chave na Mão'). Você continua usando seu celular normalmente e vê os agendamentos e vendas acontecendo sozinhos."
  }
];

// Preços ajustados para a estratégia de Setup Fee + Manutenção
export const PRICE_OLD = 2500;
export const PRICE_NEW = 500; // Valor promocional de Setup (Start)
export const INSTALLMENTS = 12;
export const INSTALLMENT_VALUE = 500.00;