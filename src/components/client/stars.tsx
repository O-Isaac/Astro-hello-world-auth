const generateStars = (numStars: number) => {
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 2;
    stars.push({ size, x, y, delay });
  }

  return stars;
};

interface Props {
  numStars?: number;
}

const StarryBackground = ({ numStars = 100 }: Props) => {
  const stars = generateStars(numStars);

  return stars.map((star, index) => (
    <div
      key={index}
      className="absolute rounded-full animate-twinkle"
      style={{
        width: `${star.size}px`,
        height: `${star.size}px`,
        backgroundColor: "white",
        top: `${star.y}%`,
        left: `${star.x}%`,
        animationDelay: `${star.delay}s`,
      }}
    />
  ));
};

export default StarryBackground;
