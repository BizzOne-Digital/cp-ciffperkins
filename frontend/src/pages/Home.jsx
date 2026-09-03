import React from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Hero from '../components/home/Hero'
import LegacyIntro from '../components/home/LegacyIntro'
import FeaturedProducts from '../components/home/FeaturedProducts'
import AboutPreview from '../components/home/AboutPreview'
import ServicesBooking from '../components/home/ServicesBooking'
import FeaturedBooks from '../components/home/FeaturedBooks'
import MusicSection from '../components/home/MusicSection'
import GalleryPreview from '../components/home/GalleryPreview'
import Testimonials from '../components/home/Testimonials'
import FinalCTA from '../components/home/FinalCTA'

export default function Home() {
  useDocumentMeta(
    'Home',
    'Official site of Cliff Perkins — author, musician, and speaker. Books, music, booking, and the story of a legacy built on soul.'
  )

  return (
    <>
      <Hero />
      <LegacyIntro />
      <FeaturedProducts />
      <AboutPreview />
      <ServicesBooking />
      <FeaturedBooks />
      <MusicSection />
      <GalleryPreview />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
