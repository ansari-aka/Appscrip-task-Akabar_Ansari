import Image from "next/image";

function slugify(s = "") {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function RatingStars({ rate }) {
  const fullStars = Math.floor(rate);
  const emptyStars = 5 - fullStars;

  return (
    <span className="ratingStars" aria-label={`Rating ${rate} out of 5`}>
      {"★".repeat(fullStars)}
      {"☆".repeat(emptyStars)}
    </span>
  );
}

export default function ProductGrid({ products = [] }) {
  return (
    <div className="grid">
      {products.map((p) => {
        const imgAlt = p.title;

        const seoName = `${slugify(p.title)}.jpg`;
        return (
          <article className="card" key={p.id}>
            <div className="card__imgWrap">
              <Image
                src={p.image}
                alt={imgAlt}
                width={300}
                height={360}
                className="card__img"
              />
            </div>

            <div className="card__body">
              <h3 className="card__title">{p.title}</h3>

              <div className="card__meta">
                <span className="price">${p.price}</span>

                <div className="rating">
                  <RatingStars rate={p.rating?.rate ?? 0} />
                  <span className="ratingText">
                    {p.rating?.rate ?? 0} ({p.rating?.count ?? 0})
                  </span>
                </div>

                <button
                  className="wish"
                  aria-label={`Add ${p.title} to wishlist`}
                >
                  ♡
                </button>
              </div>

              <span className="sr-only">Image name: {seoName}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
