import Slideshow from "../UserComponents/Sliders/SlideshowCommon";

const slidesWithHtml = [
  {
    customContent: (
      <div>
        <h2>Explore Nature</h2>
        <p>This is some custom content for the nature slide.</p>
        <button>Learn More</button>
      </div>
    ),
  },
  {
    customContent: (
      <div>
        <h2>Winter Wonderland</h2>
        <p>Snow-covered landscapes are breathtaking.</p>
        <button>Learn More</button>
      </div>
    ),
  },
  {
    customContent: (
      <div>
        <h2>Adventure Awaits</h2>
        <p>Get ready for an adventure in the mountains.</p>
        <a href="/adventures">Discover More</a>
      </div>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="py-9">
      <Slideshow slidesData={slidesWithHtml} />
      <p className="py-20">Get ready for an adventure in the mountains.</p>
      <Slideshow slidesData={slidesWithHtml} />
    </div>
  );
}
