import React from "react";
import "../../styles/gallery.css";
import { useNavigate } from "react-router-dom";
const Gallery = () => {
    const navigate = useNavigate();
    const goToForum = () => navigate("/forum");
    return (
        <div className="container-fluid bg-custom-yellow p-0" >
          {/* Header Image */}
          <div className="position-relative">
            <img
              src="https://res.cloudinary.com/danezqzag/image/upload/v1742417646/hector-martinez-SZI5BG9jcN0-unsplash_nsbghq.jpg"
              className="img-fluid container-fluid p-0"
              alt="City view"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center ">
              <h1 className="display-4 fw-bold text-custom-green2"
              style={{ textShadow: '2px 2px 4px #000000', fontSize: '6rem' }}
              >GALERÍA</h1>
            </div>
          </div>
    
          {/* Share Your Adventure Section */}
          <div className=" p-5">
            <h2 className=" mb-3 fw-bold text-custom-green"
            style={{ fontSize: '3rem' , marginLeft: '5rem'}}
            >¡Comparte tu aventura!</h2>
            <p 
            className="text-custom-paragraph mb-4"
            style={{ marginLeft: '5rem', fontSize: '2rem' , marginRight: '5rem'}}>
              Muéstranos cómo ves tu aventura utilizando los hashtags
              <span 
              className="fw-bold text-custom-green"
              > #ViveTuAventura</span> en
              <span 
              className="fw-bold text-custom-paragraph"
              > @AventuraWeb</span> para tener la oportunidad de aparecer en la lista.
            </p>
            <button 
            className="btn btn-success rounded-pill fw-bold bg-custom-green text-custom-paragraph2"
            style={{ marginLeft: '30rem', fontSize: '1.5rem', padding: "15px 80px", }}
            onClick={goToForum}>
              Agregar mi experiencia
            </button>
          </div>
    
          {/* Gallery Section */}
          <div className="container-fluid p-3">
            {/* Row 1 */}
            <div className="row g-3 mb-3" style={{marginLeft: '12rem'}}>
              <div className="col-md-4 position-relative">
                <img
                  src="https://res.cloudinary.com/danezqzag/image/upload/v1742418568/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMTU2MDMyODMvMTdmNzJmN2UzNjNjODc4Nzg0MjQ3NWM4NTE0MjZlNGYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_edi0g1.jpg"
                  className="img-fluid rounded"
                  alt="primera imagen"
                  style={{ width: '600px', height: '520px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 fw-bold m-5 text-custom-green2 "
                >@Usuario</div>
              </div>
              
              <div className="col-md-8">
                <div className="row g-3"
                >
                  <div className="col-12 position-relative ">
                    <img
                      src="https://res.cloudinary.com/danezqzag/image/upload/v1742418568/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNjk3NzMzNDAvOTVlMTQ4OWJkZGE3MzBhYzY5YWNjMWNhZjdjYzYwOGMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_lsaoro.jpg"
                      className="img-fluid rounded container-fluid p-0"
                      alt="imagen2"
                      style={{ width: '600px', height: '250px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0 t fw-bold m-5 text-custom-green2"
                    >@Usuario</div>
                  </div>
                  <div className="col-12 position-relative">
                    <img
                      src="https://res.cloudinary.com/danezqzag/image/upload/v1742418569/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTEwODkxMzMvODFlYTJjMGM2ODE4NWJmYTU3OTMzNzVlODY3MGU3MjguanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_exjzuf.jpg"
                      className="img-fluid rounded container-fluid p-0"
                      alt="imagen3"
                      style={{ width: '600px', height: '250px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0  fw-bold m-5 text-custom-green2"
                    >@Usuario</div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Row 2 */}
            <div className="row g-3 mb-3">
              {[
                ' https://res.cloudinary.com/danezqzag/image/upload/v1742418568/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTEwODkxMzAvNDc5YWU0NTFiMzUxYzM5YjBiNGZiZGE0NWUzNDZiYTUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_ahl6rx.jpg',
                'https://res.cloudinary.com/danezqzag/image/upload/v1742418568/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNDgwMDU0NjQvYzk2Yzk4NmEzMWI1ZDMxNDFiNjEwZjM1YzFhOTM2OGEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_z0pnwz.jpg',
                'https://res.cloudinary.com/danezqzag/image/upload/v1742418568/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNzE4MTEwNzkvYmNhNGFlZmJlZGFlNWI2NzFjNTI1NmM5N2E0ZjViZWIuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_isac00.jpg'
              ].map((img, i) => (
                <div key={i} className="col-md-3 position-relative">
                  <img
                    src={img}
                    className="img-fluid rounded container-fluid p-0"
                    alt={`imagen${i + 1}`}
                    style={{ width: '400px', height: '400px', objectFit: 'cover' , marginLeft: '12rem'}}
                  />
                  <div className="position-absolute bottom-0 start-0 fw-bold m-2 text-custom-green2"
                  >@Usuario</div>
                </div>
              ))}
            </div>
    
            {/* Row 3 */}
            <div className="row g-3 mb-3" style={{marginLeft: '12rem'}}>
              <div className="col-md-4 position-relative">
                <img
                  src="https://res.cloudinary.com/danezqzag/image/upload/v1742418569/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTA0MzAyMzMvNzVhODkzODRlZGQwY2RmYmU1NWM5MDYzMjA2NzYxZmQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_mxeenc.jpg"
                  className="img-fluid rounded"
                  alt="primera imagen"
                  style={{ width: '600px', height: '520px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 fw-bold m-5 text-custom-green2 "
                >@Usuario</div>
              </div>
              
              <div className="col-md-8">
                <div className="row g-3"
                >
                  <div className="col-12 position-relative ">
                    <img
                      src="https://res.cloudinary.com/danezqzag/image/upload/v1742418568/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTQ4NTkxMDEvMzg1NjNiNTQ0Y2JkMTFmMGQ0MzBlZWJhNDM3M2JjYmQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_ycupvv.jpg"
                      className="img-fluid rounded container-fluid p-0"
                      alt="imagen2"
                      style={{ width: '600px', height: '250px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0 t fw-bold m-5 text-custom-green2"
                    >@Usuario</div>
                  </div>
                  <div className="col-12 position-relative">
                    <img
                      src="https://res.cloudinary.com/danezqzag/image/upload/v1742418569/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNDM1NTYxMTkvZDE1MmUwOTllM2IyMzUyNGVjMWNmODAyNjMwNzdlZmMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImh_wsn6pi.jpg"
                      className="img-fluid rounded container-fluid p-0"
                      alt="imagen3"
                      style={{ width: '600px', height: '250px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0  fw-bold m-5 text-custom-green2"
                    >@Usuario</div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Row 4 */}
            <div className="row g-3 mb-3">
              {[
                'https://res.cloudinary.com/danezqzag/image/upload/v1742418570/57e3e242-9f38-48a6-bcec-72763abf8e5c_fbzohe.jpg',
                'https://res.cloudinary.com/danezqzag/image/upload/v1742418570/Sabas_Nieves_com1w9.jpg',
                'https://res.cloudinary.com/danezqzag/image/upload/v1742418570/Vale_TV_Canal_5_on_Instagram__Caracas_c7khtf.jpg'
              ].map((img, i) => (
                <div key={i} className="col-md-3 position-relative">
                  <img
                    src={img}
                    className="img-fluid rounded container-fluid p-0"
                    alt={`imagen${i + 1}`}
                    style={{ width: '400px', height: '400px', objectFit: 'cover' , marginLeft: '12rem'}}
                  />
                  <div className="position-absolute bottom-0 start-0 fw-bold m-2 text-custom-green2"
                  >@Usuario</div>
                </div>
    
              ))}
            </div>
          </div>
        </div>
    );
};



export default Gallery;