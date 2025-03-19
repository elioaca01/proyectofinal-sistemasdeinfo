import React from "react";

const Gallery = () => {
  return (
    <div className="bg-light p-0" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Header Image */}
      <div className="position-relative">
        <img
          src="https://storage.googleapis.com/a1aa/image/PogUzLlTxdBjoYsjCtcrssliJa4XoWbFUBY_9oUtUTA.jpg"
          className="img-fluid w-100"
          alt="City view"
          style={{ height: '24rem', objectFit: 'cover', filter: 'brightness(0.7)' }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="text-white display-3 fw-bold shadow-sm">GALERÍA</h1>
        </div>
      </div>

      {/* Share Your Adventure Section */}
      <div className="text-center py-5 px-4">
        <h2 className="fw-bold text-primary mb-3">COMPARTE TU AVENTURA</h2>
        <p className="text-secondary mb-4">
          Muéstranos cómo ves tu aventura utilizando los hashtags
          <span className="fw-bold"> #ViveTuAventura</span> en
          <span className="fw-bold"> @AventuraWeb</span> para tener la oportunidad de aparecer en la lista.
        </p>
        <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-lg">
          Agregar mi experiencia
        </button>
      </div>

      {/* Gallery Section */}
      <div className="container px-3">
        {[1, 2, 3].map((row, index) => (
          <div key={index} className="row g-3 mb-3">
            {[1, 2, 3].map((col, i) => (
              <div key={i} className="col-md-4 position-relative overflow-hidden rounded shadow-sm">
                <img
                  src={`https://source.unsplash.com/random/400x300?sig=${index * 3 + i}`}
                  className="img-fluid rounded"
                  alt="Galería"
                  style={{ height: '12rem', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                />
                <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2 bg-dark bg-opacity-50 px-2 rounded">
                  @Usuario
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;