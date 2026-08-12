export default function BestSellerCard({
  product,
}) {
  return (
    <article
      className={`
        group
        relative
        aspect-[4/5]
        w-full
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-gradient-to-br
        ${product.gradient}
        shadow-[0_20px_60px_rgba(15,23,42,0.10)]
        will-change-transform
      `}
    >
      {/* =================================================
          IMAGE
          ================================================= */}

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          p-7
          sm:p-8
        "
      >
        <img
          src={product.image}
          alt={product.name}
          draggable="false"
          className="
            h-full
            w-full
            select-none
            object-contain
            drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)]
          "
        />
      </div>

      {/* =================================================
          BOTTOM GRADIENT
          ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-1/2
          bg-gradient-to-t
          from-black/45
          via-black/10
          to-transparent
        "
      />

      {/* =================================================
          PRODUCT DETAILS
          ================================================= */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          p-5
          text-white
        "
      >
        {/* Category */}

        <span
          className="
            inline-flex
            rounded-full
            border
            border-white/20
            bg-white/20
            px-2.5
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            backdrop-blur-md
          "
        >
          {product.category}
        </span>

        {/* Product name */}

        <h3
          className="
            mt-2
            line-clamp-2
            text-base
            font-bold
            leading-tight
            drop-shadow-sm
          "
        >
          {product.name}
        </h3>

        {/* Price + rating */}

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-lg
              font-black
            "
          >
            {product.price}
          </span>

          <span
            className="
              text-xs
              font-bold
            "
          >
            ★ {product.rating}
          </span>
        </div>
      </div>
    </article>
  );
}