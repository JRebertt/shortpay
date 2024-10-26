import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
  title: string
  description: string
}

interface ProgressBarProps {
  steps: Step[]
  currentStep: number
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                backgroundColor:
                  index <= currentStep ? 'var(--primary)' : 'var(--gray-200)',
                color:
                  index <= currentStep
                    ? 'var(--primary-foreground)'
                    : 'var(--gray-500)',
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full"
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: index < currentStep ? 1 : 0,
                  scale: index < currentStep ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {index < currentStep ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
            </motion.div>
            <p className="mt-2 text-sm font-medium">{step.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-2">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            className="flex-1"
            initial={false}
            animate={{
              backgroundColor:
                index < currentStep ? 'var(--primary)' : 'var(--gray-200)',
            }}
            style={{
              borderTopLeftRadius: index === 0 ? '9999px' : '0',
              borderBottomLeftRadius: index === 0 ? '9999px' : '0',
              borderTopRightRadius: index === steps.length - 1 ? '9999px' : '0',
              borderBottomRightRadius:
                index === steps.length - 1 ? '9999px' : '0',
            }}
          ></motion.div>
        ))}
      </div>
    </div>
  )
}
