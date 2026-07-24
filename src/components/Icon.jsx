import {
  IconUsers,
  IconBed,
  IconRoute,
  IconSparkles,
  IconQuote,
  IconBrandWhatsapp,
} from '@tabler/icons-react'

const icons = {
  users: IconUsers,
  bed: IconBed,
  route: IconRoute,
  sparkle: IconSparkles,
  quote: IconQuote,
  whatsapp: IconBrandWhatsapp,
}

export default function Icon({ name, className = '' }) {
  const TablerIcon = icons[name]
  if (!TablerIcon) return null
  return (
    <span className={`icon ${className}`.trim()} aria-hidden="true">
      <TablerIcon />
    </span>
  )
}
