import { cn } from "@/lib/utils"
import {
  IconAdjustmentsBolt,
  IconChartBar,
  IconCurrencyDollar,
  IconDashboard,
  IconDeviceMobile,
  IconLock,
  IconQrcode,
  IconRefresh,
} from "@tabler/icons-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Integração Multi-Gateway",
      description:
        "Conecte-se facilmente com múltiplos gateways de pagamento em uma única plataforma.",
      icon: <IconRefresh className="w-6 h-6" />,
    },
    {
      title: "Geração Simplificada de Pix",
      description:
        "Crie códigos Pix e QR codes com apenas um clique, simplificando o processo de pagamento.",
      icon: <IconQrcode className="w-6 h-6" />,
    },
    {
      title: "Preços Competitivos",
      description:
        "Oferecemos as melhores taxas do mercado, sem taxas ocultas ou compromissos longos.",
      icon: <IconCurrencyDollar className="w-6 h-6" />,
    },
    {
      title: "Painel de Controle Intuitivo",
      description: "Interface amigável para gerenciar todas as suas transações e integrações.",
      icon: <IconDashboard className="w-6 h-6" />,
    },
    {
      title: "Análises em Tempo Real",
      description: "Monitore o desempenho dos seus pagamentos com métricas detalhadas e atualizadas.",
      icon: <IconChartBar className="w-6 h-6" />,
    },
    {
      title: "Suporte Técnico Especializado",
      description:
        "Nossa equipe está disponível para ajudar com qualquer questão técnica ou de integração.",
      icon: <IconAdjustmentsBolt className="w-6 h-6" />,
    },
    {
      title: "Segurança de Ponta",
      description:
        "Utilizamos as mais avançadas tecnologias de criptografia para proteger seus dados e transações.",
      icon: <IconLock className="w-6 h-6" />,
    },
    {
      title: "Compatibilidade Mobile",
      description: "Totalmente responsivo e otimizado para uso em dispositivos móveis.",
      icon: <IconDeviceMobile className="w-6 h-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  )
}

export default FeaturesSection