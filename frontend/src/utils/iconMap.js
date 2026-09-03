import {
  Mic2,
  BookOpenText,
  Music4,
  Users,
  Church,
  GraduationCap,
  Calendar,
  Star,
  Heart,
  MessageCircle,
  Camera,
  Award,
} from 'lucide-react'

const ICON_MAP = {
  mic: Mic2,
  microphone: Mic2,
  speaking: Mic2,
  book: BookOpenText,
  writing: BookOpenText,
  music: Music4,
  concert: Music4,
  workshop: Users,
  coaching: Users,
  church: Church,
  ministry: Church,
  education: GraduationCap,
  event: Calendar,
  booking: Calendar,
  star: Star,
  testimonial: Heart,
  interview: MessageCircle,
  media: Camera,
  award: Award,
}

export default function getIcon(name) {
  if (!name) return Star
  const key = String(name).toLowerCase().trim()
  return ICON_MAP[key] || Star
}
