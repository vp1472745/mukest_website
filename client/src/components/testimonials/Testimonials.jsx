import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { testimonials } from '../../data/testimonials';
import { Star } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#fafafa] border-t border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Kind Words
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Client Testimonials
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-16"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white border border-border-light p-8 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                {/* Review Text */}
                <div>
                  <div className="flex gap-1 text-accent mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent" />
                    ))}
                  </div>
                  <p className="text-dark/75 text-xs font-light leading-relaxed italic mb-6">
                    "{t.review}"
                  </p>
                </div>

                {/* Client Profile */}
                <div className="flex items-center gap-4 border-t border-border-light pt-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-accent/20"
                  />
                  <div>
                    <h4 className="font-display text-sm font-semibold text-dark tracking-wide">
                      {t.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-widest text-dark/45 block mt-0.5">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
