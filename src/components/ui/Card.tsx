import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  animated?: boolean
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  animated = true,
  hover = false,
  onClick 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg backdrop-blur-sm border border-gray-100'
  
  const CardComponent = animated ? motion.div : 'div'
  const animationProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    ...(hover && {
      whileHover: { 
        y: -4,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.2 }
      }
    })
  } : {}

  return (
    <CardComponent
      className={clsx(
        baseClasses,
        hover && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </CardComponent>
  )
}

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={clsx('p-6 pb-2', className)}>
    {children}
  </div>
)

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={clsx('px-6 pb-6', className)}>
    {children}
  </div>
)

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={clsx('px-6 py-4 bg-gray-50 rounded-b-xl', className)}>
    {children}
  </div>
)