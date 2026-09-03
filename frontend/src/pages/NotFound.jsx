import React from 'react'
import { Home } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Button from '../components/common/Button'

export default function NotFound() {
  useDocumentMeta('Page Not Found', 'The page you are looking for could not be found.')

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-ivory">
      <div className="text-center container-px">
        <span className="font-script text-6xl text-gold block mb-4">Oh, dear.</span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-espresso mb-3">Page Not Found</h1>
        <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
          The page you're looking for has wandered off. Let's get you back to the story.
        </p>
        <Button to="/" icon={Home}>Back to Home</Button>
      </div>
    </section>
  )
}
