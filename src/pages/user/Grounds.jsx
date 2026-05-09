import UserGroundCards from "../../Components/UserGroundCards"



export const Grounds =()=>{
     const sportsData = [
    {
      name: "Soccer",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      description: "The world's most popular sport. Fast-paced team action with strategic gameplay and incredible skill displays on the pitch.",
      gradient: "from-emerald-400 to-cyan-500",
      teamSize: "11 players",
      difficulty: 3,
      popularity: "Most Popular",
      equipmentNeeded: "Minimal"
    },
    {
      name: "Basketball",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      description: "High-flying hoops action with fast breaks and clutch shots. Perfect blend of athleticism, strategy, and teamwork.",
      gradient: "from-orange-400 to-red-500",
      teamSize: "5 players",
      difficulty: 3,
      popularity: "Trending",
      equipmentNeeded: "Minimal"
    },
    {
      name: "Rugby",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      description: "Ultimate test of strength, speed, and courage. Intense physical combat combined with tactical brilliance and teamwork.",
      gradient: "from-blue-400 to-indigo-600",
      teamSize: "15 players",
      difficulty: 4,
      popularity: "Growing",
      equipmentNeeded: "Moderate"
    },
    {
      name: "Tennis",
      image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80",
      description: "Elegant one-on-one competition requiring precision, agility, and mental fortitude. Master your serve and dominate the court.",
      gradient: "from-yellow-400 to-amber-500",
      teamSize: "1-2 players",
      difficulty: 4,
      popularity: "Classic",
      equipmentNeeded: "Basic"
    }
  ];
    return(<>
        <div>
            Grounds Page
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            <UserGroundCards/>
                      {/* {sportsData.map((sport, index) => (
                        <SportsCard key={sport.name} {...sport} index={index} />
                      ))} */}
                    </div>
        </div>
    </>)
}

