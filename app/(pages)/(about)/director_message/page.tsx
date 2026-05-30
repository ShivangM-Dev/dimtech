
import LeadershipProfile from '@/components/directors_message/LeaderShipProfile'
import leadershipData from '@/utils/data/leadershipData.json';
import React from 'react'

const page = () => {
  return (
    <div>
      <LeadershipProfile profileData={leadershipData.director}/>
    </div>
  )
}

export default page
