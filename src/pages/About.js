// About.js
import Map from "../components/Map";

function About() {
  return (
    <div className="about">
      <div className="info">
        <h1 className="maintitle">About Us</h1>
        <p>
          Welcome to <strong>Adventura</strong>, where every journey is a story
          waiting to be told.
        </p>
        <br></br>
        <p className="description">
          At Adventura, we believe in the transformative power of travel. We
          understand that every trip is more than just a destination; it's an
          experience that shapes memories, broadens horizons, and connects us to
          the world in meaningful ways.
        </p>
        <br></br>
        <p>
          Our mission is simple: to inspire and empower travelers to embark on
          their next great adventure. Whether you're a seasoned globetrotter or
          a first-time explorer, Adventura is here to be your trusted companion
          on the road less traveled.
        </p>
      </div>

      <div className="info">
        <h2 className="title">Our Story</h2>
        <p className="description">
          Founded by passionate travelers with a shared vision, Adventura was
          born out of a desire to create a community where wanderlust thrives
          and curiosity knows no bounds. What started as a humble idea has
          blossomed into a vibrant platform where adventurers from all walks of
          life come together to share their tales of exploration and discovery.
        </p>
      </div>

      <div className="info">
        <h2 className="title">What We Offer</h2>
        <p className="description">
          Adventura is more than just a travel website; it's a gateway to a
          world of possibilities. From immersive travel guides and expert tips
          to curated experiences and insider recommendations, we're here to help
          you plan the perfect getaway, whether you're dreaming of a secluded
          beach retreat, a cultural odyssey through ancient cities, or a
          thrilling outdoor adventure.
        </p>
      </div>

      <div className="info">
        <h2 className="title">Our Values</h2>
        <p className="description">
          At the heart of Adventura are our core values: authenticity,
          inclusivity, and sustainability. We believe in traveling with purpose,
          respecting local cultures, and leaving a positive impact on the places
          we visit. That's why we're committed to promoting responsible tourism
          practices and supporting initiatives that benefit both communities and
          the environment.
        </p>
      </div>

      <Map />
    </div>
  );
}

export default About;
