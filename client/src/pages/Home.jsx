import React from 'react';
import HeroSection from '../components/home/HeroSection';
import DailyVichar from '../components/common/DailyVichar';
import RadhaNaamBanner from '../components/home/RadhaNaamBanner';
import AboutPreview from '../components/home/AboutPreview';
import MissionCards from '../components/home/MissionCards';
import UpcomingEvents from '../components/home/UpcomingEvents';
import GalleryPreview from '../components/home/GalleryPreview';
import VideoPreview from '../components/home/VideoPreview';
import DonationAppeal from '../components/home/DonationAppeal';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <DailyVichar />
      <RadhaNaamBanner />
      <AboutPreview />
      <MissionCards />
      <UpcomingEvents />
      <GalleryPreview />
      <VideoPreview />
      <DonationAppeal />
    </div>
  );
};

export default Home;
