import React, { useEffect, useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import SectionTitle from '../components/common/SectionTitle'
import PlaceholderImage from '../components/common/PlaceholderImage'
import { api } from '../utils/api'

const FALLBACK_ABOUT = {
  body:
    "Cliff Perkins is an R&B tenor singer and choreographer, and the founder, manager, and organizer of Soul Generation. Beyond the stage, Cliff has built and run nearly every part of the group's business — serving as business manager, record company owner, publisher, and booking agent for Soul Generation throughout its career.\n\nFrom the group's debut album, Beyond Body and Soul, to the latest release, Soul Generation Feat. Cliff Perkins, his catalog spans decades of R&B and soul recordings alongside his published books.\n\nToday, Cliff continues to write, record, and perform — carrying that same hands-on ownership of his craft, his catalog, and his career to every audience he meets.",
}

const PHILOSOPHY =
  "Cliff believes every life carries a story worth telling and a song worth singing. His guiding philosophy is simple: speak the truth, even when it's uncomfortable, and let honesty do the healing. Whether he's on a stage, in a book, or in a quiet conversation after a show, that same conviction shows up — that people don't need to be entertained as much as they need to be seen."

const LEGACY =
  "More than record sales or book deals, Cliff measures his career by the rooms he's changed and the people who've felt less alone because of a lyric or a page. He's spent recent years investing in mentorship — helping younger authors and musicians find their own voice rather than imitate his. The goal isn't to be remembered as a name, but to leave behind a body of work that keeps doing its job long after he's off the stage."

export default function About() {
  useDocumentMeta('About', "The life and legacy of Cliff Perkins — author, musician, and speaker.")
  const [about, setAbout] = useState(FALLBACK_ABOUT)

  useEffect(() => {
    let mounted = true
    api
      .get('/content/about')
      .then((res) => {
        const data = res.data?.data
        if (mounted && data) setAbout({ ...FALLBACK_ABOUT, ...data })
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <section className="bg-espresso py-20">
        <div className="container-px mx-auto max-w-5xl text-center">
          <span className="text-softgold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            The Story
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ivory">
            About Cliff Perkins
          </h1>
        </div>
      </section>

      <section className="bg-ivory section-py">
        <div className="container-px mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <PlaceholderImage src="/aboutpage.png" alt="Cliff Perkins" label="Cliff Perkins Portrait" ratio="aspect-[4/5]" className="rounded-md" />
          <div className="space-y-5">
            {about.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-charcoal/70 text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream section-py">
        <div className="container-px mx-auto max-w-3xl text-center">
          <SectionTitle eyebrow="Personal Philosophy" title="Truth Over Performance" />
          <p className="text-charcoal/70 text-base md:text-lg leading-relaxed">{PHILOSOPHY}</p>
        </div>
      </section>

      <section className="bg-espresso section-py">
        <div className="container-px mx-auto max-w-3xl text-center">
          <SectionTitle eyebrow="Legacy" title="What He Hopes to Leave Behind" dark />
          <p className="text-cream/80 text-base md:text-lg leading-relaxed">{LEGACY}</p>
        </div>
      </section>
    </>
  )
}
