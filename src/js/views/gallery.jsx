import React from "react";

const Gallery = () => {
    return (
        <div className="container-fluid bg-custom-yellow p-0" style={{ maxWidth: '1024px' }}>
          {/* Header Image */}
          <div className="position-relative">
            <img
              src="https://storage.googleapis.com/a1aa/image/PogUzLlTxdBjoYsjCtcrssliJa4XoWbFUBY_9oUtUTA.jpg"
              className="img-fluid container-fluid p-0"
              alt="City view"
              style={{ height: '20rem', objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center ">
              <h1 className="text-custom-yellow display-4 fw-bold">GALERÍA</h1>
            </div>
          </div>
    
          {/* Share Your Adventure Section */}
          <div className="text-center p-5">
            <h2 className=" mb-4 fw-bold text-custom-green">COMPARTE TU AVENTURA</h2>
            <p className="text-custom-green mb-4">
              Muéstranos cómo ves tu aventura utilizando los hashtags
              <span className="fw-bold"> #ViveTuAventura</span> en
              <span className="fw-bold"> @AventuraWeb</span> para tener la oportunidad de aparecer en la lista.
            </p>
            <button className="btn btn-success rounded-pill px-4 py-2 fw-bold bg-custom-green">
              Agregar mi experiencia
            </button>
          </div>
    
          {/* Gallery Section */}
          <div className="container-fluid p-3">
            {/* Row 1 */}
            <div className="row g-3 mb-3">
              <div className="col-md-4 position-relative">
                <img
                  src=""
                  className="img-fluid rounded"
                  alt="primera imagen"
                  style={{ height: '24rem', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2">@Usuario</div>
              </div>
              
              <div className="col-md-8">
                <div className="row g-3">
                  <div className="col-12 position-relative ">
                    <img
                      src=""
                      className="img-fluid rounded container-fluid p-0"
                      alt="imagen2"
                      style={{ height: '12rem', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2">@Usuario</div>
                  </div>
                  <div className="col-12 position-relative">
                    <img
                      src=""
                      className="img-fluid rounded container-fluid p-0"
                      alt="imagen3"
                      style={{ height: '12rem', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2">@Usuario</div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Row 2 */}
            <div className="row g-3 mb-3">
              {[
                '',
                '',
                ''
              ].map((img, i) => (
                <div key={i} className="col-md-4 position-relative">
                  <img
                    src={img}
                    className="img-fluid rounded container-fluid p-0"
                    alt="imagen456"
                    style={{ height: '12rem', objectFit: 'cover' }}
                  />
                  <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2">@Usuario</div>
                </div>
              ))}
            </div>
    
            {/* Row 3 */}
            <div className="row g-3 mb-3">
              <div className="col-md-4 position-relative">
                <img
                  src=""
                  className="img-fluid rounded"
                  alt="imagen7"
                  style={{ height: '24rem', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2">@Usuario</div>
              </div>
              
              <div className="col-md-8">
                <div className="row g-3">
                  {[
                    '',
                    ''
                  ].map((img, i) => (
                    <div key={i} className="col-12 position-relative ">
                      <img
                        src={img}
                        className="img-fluid rounded container-fluid p-0"
                        alt="imagen89"
                        style={{ height: '12rem', objectFit: 'cover' }}
                      />
                      <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2">@Usuario</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    
            {/* Row 4 */}
            <div className="row g-3">
              {[
                '',
                '',
                ''
              ].map((img, i) => (
                <div key={i} className="col-md-4 position-relative">
                  <img
                    src={img}
                    className="img-fluid rounded container-fluid p-0"
                    alt="imagen101112"
                    style={{ height: '12rem', objectFit: 'cover' }}
                  />
                  <div className="position-absolute bottom-0 start-0 text-white fw-bold m-2">@Usuario</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
    
export default Gallery;