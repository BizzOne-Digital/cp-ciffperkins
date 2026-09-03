import React, { useEffect, useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import SectionTitle from '../components/common/SectionTitle'
import PlaceholderImage from '../components/common/PlaceholderImage'
import { api } from '../utils/api'

const FALLBACK_ABOUT = {
  body:
    "Cliff Perkins was raised on gospel harmonies and hometown grit, in a home where storytelling and song were the family's shared language. Over four decades, that upbringing grew into a career spanning six published books, five studio albums, and thousands of live performances across churches, theaters, and festival stages.\n\nCliff's writing draws on real hardship and real hope — memoir, reflection, and fiction that never shy away from the truth. His music carries the same honesty, rooted in gospel and soul, built to move a room from silence to standing ovation.\n\nToday, Cliff continues to write, record, and tour, mentoring the next generation of storytellers and musicians while building a legacy meant to outlast him.",
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
