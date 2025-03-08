import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Destination = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  const goToReservations = () => {
    navigate("/home");
  };

  return (
    <div className="bg-light">
      {/* Header */}
      <div className="bg-light bg-custom-yellow">
        <header className="imagen pasos">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/990/778/non_2x/close-up-of-hiker-s-feet-walking-on-a-mountain-path-free-photo.jpg"
            alt="Header"
            className="w-100"
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <h1 className="text-white display-4 fw-bold">DESTINOS</h1>
          </div>
        </header>
      </div>

      <div className="descripcion">
        <div className="container-fluid p-4 bg-custom-yellow">
          <p className="mb-0"> {/* Añadido mb-0 para eliminar el margen inferior del párrafo */}
            Los mejores destinos en Parque Nacional El Ávila
          </p>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="container-fluid p-4 bg-custom-yellow"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4">SABAS NIEVES</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3">
          <span>
            <i className="fas fa-star text-warning me-1"></i>
            4.8
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-map-marker-alt text-danger me-1"></i>
            3.9 km
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-walking text-success me-1"></i>
            Medio
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-clock text-primary me-1"></i>
            1h 30min
          </span>
        </div>

        {/* Sección de imágenes y descripción */}
        <div className="row align-items-start">
          {/* Columna para la imagen principal */}
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741468054/foto_1_ys3d4b.jpg"
                alt="Imagen 1"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "15px"
                }}
                className="img-fluid"
              />
              <button
                className="btn btn-primary position-absolute"
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #fbfada",
                  color: "#fbfada",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  bottom: "20px",
                  left: "20px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "15px",
                  fontWeight: "bold",
                  letterSpacing: "1px"
                }}
                onClick={goToHome}
              >
                Ver más
              </button>
            </div>
          </div>

          {/* Columna para las imágenes 2 y 3 */}
          <div className="col-md-3 d-flex flex-column gap-3">
            <img
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741471410/foto_2_gb98u1.jpg"
              alt="Imagen 2"
              style={{
                width: "100%",
                height: "145px",
                objectFit: "cover",
                borderRadius: "15px"
              }}
              className="img-fluid"
            />
            <img
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741475827/foto_3_z4qnpz.jpg"
              alt="Imagen 3"
              style={{
                width: "100%",
                height: "145px",
                objectFit: "cover",
                borderRadius: "15px"
              }}
              className="img-fluid"
            />
          </div>

          {/* Columna para la descripción y botón de reserva */}
          <div className="col-md-3 d-flex flex-column justify-content-between">
            <p className="text-muted">
              Disfruta de una desafiante caminata de 6.4 km hasta el Hotel Humboldt.
              Prepárate para unas 4 horas de ascenso por senderos escarpados y bosques nublados.
            </p>
            <button
              className="btn btn-primary align-self-start"
              style={{
                backgroundColor: "#09490e",
                border: "2px solid #09490e",
                color: "#fbfada",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "15px",
                fontWeight: "bold",
                letterSpacing: "1px"
              }}
              onClick={goToReservations}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="container-fluid p-4 bg-custom-yellow"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4">LAGUNAZO</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3">
          <span>
            <i className="fas fa-star text-warning me-1"></i>
            4.8
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-map-marker-alt text-danger me-1"></i>
            6.4 km
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-walking text-success me-1"></i>
            Difícil
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-clock text-primary me-1"></i>
            4h 30min
          </span>
        </div>

        {/* Sección de imágenes y descripción */}
        <div className="row">
          {/* Columna para las imágenes */}
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-12">
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Imagen 1"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 3"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          {/* Columna para la descripción */}
          <div className="col-md-6">
            <p className="text-muted">
              Disfruta de una desafiante caminata de 6.4 km hasta el Hotel Humboldt. Prepárate para unas 4 horasde ascenso por senderos escarpados y bosques nublados.
            </p>
          </div>
        </div>
      </div>


      {/* Contenedor principal */}
      <div className="container-fluid p-4 bg-custom-yellow"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4">EL banquito, lagunazo y pico occidental  </h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3">
          <span>
            <i className="fas fa-star text-warning me-1"></i>
            4.6
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-map-marker-alt text-danger me-1"></i>
            18.8 km
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-walking text-success me-1"></i>
            Difícil
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-clock text-primary me-1"></i>
            10h 40min
          </span>
        </div>

        {/* Sección de imágenes y descripción */}
        <div className="row">
          {/* Columna para las imágenes */}
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-12">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741468054/foto_1_ys3d4b.jpg"
                    alt="Imagen 1"
                    style={{
                      width: "35%",
                      height: "300px", // Ajusta la altura según necesites
                      objectFit: "cover", // Recorta la imagen sin deformarla
                      borderRadius: "15px" // Bordes redondeados
                    }}
                    className="img-fluid"
                  />
                  <div className="text-left my-4">
                    <button
                      className="btn btn-primary position-absolute"
                      style={{
                        backgroundColor: "transparent",
                        border: "2px solid #fbfada",
                        color: "#fbfada",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        bottom: "35px", // 🔹 Subir el botón dentro de la imagen
                        left: "20px", // 🔹 Mantener alineado en la esquina izquierda
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "15px",
                        fontWeight: "bold",
                        letterSpacing: "1px"
                      }}
                      onClick={goToHome}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 3"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          {/* Columna para la descripción */}
          <div className="col-md-6">
            <p className="text-muted">
              Embárcate en una ruta de 18.8 km y pon a prueba tus límites. Esta aventura te recompensará con vistas panorámicas, la satisfacción de superar un desafío y una conexión profunda con la naturaleza.
            </p>
          </div>
        </div>
      </div>


      {/* Contenedor principal */}
      <div className="container-fluid p-4 bg-custom-yellow"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4">PICO NAIGUATA</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3">
          <span>
            <i className="fas fa-star text-warning me-1"></i>
            4.2
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-map-marker-alt text-danger me-1"></i>
            16.4 km
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-walking text-success me-1"></i>
            Difícil
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-clock text-primary me-1"></i>
            9h 21min
          </span>
        </div>

        {/* Sección de imágenes y descripción */}
        <div className="row">
          {/* Columna para las imágenes */}
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-12 position-relative">
                <img
                  src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741468054/foto_1_ys3d4b.jpg"
                  alt="Imagen 1"
                  style={{ width: "50%", height: "auto" }}
                  className="img-fluid rounded"
                />
                <div className="text-left my-4">
                  <button
                    className="position-absolute bottom-0 start-0 m-3 btn btn-primary"
                    style={{
                      backgroundColor: 'transparent',
                      border: '4px solid #006400',  // Verde oscuro
                      color: '#006400',             // Texto en verde oscuro
                      padding: '10px 20px',         // Espaciado interno
                      borderRadius: '8px',          // Bordes redondeados
                      cursor: 'pointer'
                    }}
                    onClick={goToHome}
                  >
                    Ver más

                  </button>
                </div>
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 3"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          {/* Columna para la descripción */}
          <div className="col-md-6">
            <p className="text-muted">
              Esta ruta, popular entre senderistas y campistas,  Conocida por sus senderos desafiantes y paisajes variados, esta ruta es ideal para aquellos que buscan una experiencia de senderismo más larga.
            </p>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="container-fluid p-4 bg-custom-yellow"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4">Cruz de Los Palmeros y Pico Oriental</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3">
          <span>
            <i className="fas fa-star text-warning me-1"></i>
            4.9
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-map-marker-alt text-danger me-1"></i>
            6.4 km
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-walking text-success me-1"></i>
            Difícil
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-clock text-primary me-1"></i>
            4h 10min
          </span>
        </div>

        {/* Sección de imágenes y descripción */}
        <div className="row">
          {/* Columna para las imágenes */}
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-12">
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Imagen 1"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 3"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          {/* Columna para la descripción */}
          <div className="col-md-6">
            <p className="text-muted">
              Sal a esta ruta de punto a punto de 6,4-km. Por lo general, se considera una ruta difícil. Es una región muy popular para mochilear y el senderismo.
            </p>
          </div>
        </div>
      </div>


      {/* Contenedor principal */}
      <div className="container-fluid p-4 bg-custom-yellow pb-5"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4">Piedra del Indio via Quebrada Quintero</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3">
          <span>
            <i className="fas fa-star text-warning me-1"></i>
            4.5
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-map-marker-alt text-danger me-1"></i>
            6.3 km
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-walking text-success me-1"></i>
            Medio
          </span>
          <span>|</span>
          <span>
            <i className="fas fa-clock text-primary me-1"></i>
            2h 38min
          </span>
        </div>

        {/* Sección de imágenes y descripción */}
        <div className="row">
          {/* Columna para las imágenes */}
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-12">
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Imagen 1"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Imagen 3"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          {/* Columna para la descripción */}
          <div className="col-md-6">
            <p className="text-muted">
              esta ruta  tiene la descripcion igual a la del banquito
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;