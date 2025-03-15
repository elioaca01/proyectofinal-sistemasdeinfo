import React from "react";
import { useNavigate } from "react-router-dom";

const Destination = () => {
  const navigate = useNavigate();

  const goToForum = () => {
    navigate("/forum");
  };
  const goToGallery = () => {
    navigate("/gallery");
  };

  const goToReservations = () => {
    navigate("/reservation");
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
            <h1 className="text-white display-4 fw-bold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "100px",
                fontWeight: "bold",
                color: "#000",
              }}>
              DESTINOS</h1>
          </div>
        </header>
      </div>

      <div className="descripcion">
        <div className="container-fluid p-4 bg-custom-yellow">
          <p className="mb-0"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "25px",
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
            }}> {/* Añadido mb-0 para eliminar el margen inferior del párrafo */}
            Los mejores destinos en Parque Nacional El Ávila
          </p>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="container-fluid p-4 bg-custom-yellow"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#000",
          }}>
          Sabas Nieves</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "18px" }}>
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

        {/* Sección de imágenes */}
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
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#fbfada";
                  e.target.style.color = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#fbfada";
                }}
                onClick={goToGallery}
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
            <p className
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
                color: "#000",
                lineHeight: "1.6",
                textAlign: "justify",
              }}>
              Sumérgete en la naturaleza de Municipio Sucre con una caminata moderada de 4 km.
              Disfruta de paisajes asombrosos y aire puro en un recorrido de aproximadamente 2 horas.
            </p>
            <button
              className="btn btn-primary align-self-center"
              style={{
                backgroundColor: "#09490e",
                border: "2px solid #09490e",
                color: "#fbfada",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
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
        <h1 className="h2 mb-4"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#000",
          }}>
          Lagunazo</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "18px" }}>
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

        {/* Sección de imágenes */}
        <div className="row align-items-start">
          {/* Columna para la imagen principal */}
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741550837/foto_4_gvl9jb.jpg"
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
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#fbfada";
                  e.target.style.color = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#fbfada";
                }}
                onClick={goToGallery}
              >
                Ver más
              </button>
            </div>
          </div>

          {/* Columna para las imágenes 2 y 3 */}
          <div className="col-md-3 d-flex flex-column gap-3">
            <img
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741550964/foto_5_ltnmcb.png"
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
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741551086/foto_6_c2x8th.jpg"
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
            <p 
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
                color: "#000",
                lineHeight: "1.6",
                textAlign: "justify",
              }}>
              Disfruta de una desafiante caminata de 6.4 km hasta el Hotel Humboldt.
              Prepárate para unas 4 horas de ascenso por senderos escarpados y bosques nublados.
            </p>
            <button
              className="btn btn-primary align-self-center"
              style={{
                backgroundColor: "#09490e",
                border: "2px solid #09490e",
                color: "#fbfada",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
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
        <h1 className="h2 mb-4"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#000",
          }}>
          El Banquito, Lagunazo y Pico Occidental  </h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "18px" }}>
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

        {/* Sección de imágenes */}
        <div className="row align-items-start">
          {/* Columna para la imagen principal */}
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741551497/foto_7_fxxajr.jpg"
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
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#fbfada";
                  e.target.style.color = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#fbfada";
                }}
                onClick={goToGallery}
              >
                Ver más
              </button>
            </div>
          </div>

          {/* Columna para las imágenes 2 y 3 */}
          <div className="col-md-3 d-flex flex-column gap-3">
            <img
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741551563/foto_8_er3n4x.jpg"
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
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741551627/foto_9_nx9djf.jpg"
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
            <p className
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
                color: "#000",
                lineHeight: "1.6",
                textAlign: "justify",
              }}>
              Embárcate en una ruta de 19 km y pon a prueba tus límites.
              Esta aventura te recompensará con vistas panorámicas, la satisfacción
              de superar un desafío y una conexión profunda con la naturaleza.
            </p>
            <button
              className="btn btn-primary align-self-center"
              style={{
                backgroundColor: "#09490e",
                border: "2px solid #09490e",
                color: "#fbfada",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
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
        <h1 className="h2 mb-4"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#000",
          }}>
          Pico Naiguata</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "18px" }}>
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

        {/* Sección de imágenes */}
        <div className="row align-items-start">
          {/* Columna para la imagen principal */}
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741554317/foto_10_vdoob9.jpg"
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
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#fbfada";
                  e.target.style.color = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#fbfada";
                }}
                onClick={goToGallery}
              >
                Ver más
              </button>
            </div>
          </div>

          {/* Columna para las imágenes 2 y 3 */}
          <div className="col-md-3 d-flex flex-column gap-3">
            <img
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741554417/foto_11_gj7wx5.jpg"
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
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741554455/foto_12_ezxhkn.jpg"
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
            <p className
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
                color: "#000",
                lineHeight: "1.6",
                textAlign: "justify",
              }}>
              Esta ruta, popular entre senderistas y campistas,  Conocida por sus senderos desafiantes
              y paisajes variados, esta ruta es ideal para aquellos que buscan una experiencia de senderismo más larga.
            </p>
            <button
              className="btn btn-primary align-self-center"
              style={{
                backgroundColor: "#09490e",
                border: "2px solid #09490e",
                color: "#fbfada",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
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
        <h1 className="h2 mb-4"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#000",
          }}>
          Cruz de Los Palmeros y Pico Oriental</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "18px" }}>
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

        {/* Sección de imágenes */}
        <div className="row align-items-start">
          {/* Columna para la imagen principal */}
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741554735/foto_13_j9wxyf.jpg"
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
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#fbfada";
                  e.target.style.color = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#fbfada";
                }}
                onClick={goToGallery}
              >
                Ver más
              </button>
            </div>
          </div>

          {/* Columna para las imágenes 2 y 3 */}
          <div className="col-md-3 d-flex flex-column gap-3">
            <img
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741554787/foto_14_y2sgqr.jpg"
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
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741554809/foto_15_nghqnd.jpg"
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
            <p className
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
                color: "#000",
                lineHeight: "1.6",
                textAlign: "justify",
              }}>
              Sal a esta ruta de punto a punto de 6,4 km. Por lo general,
              se considera una ruta difícil. Es una región muy popular
              para mochilear y el senderismo.
            </p>
            <button
              className="btn btn-primary align-self-center"
              style={{
                backgroundColor: "#09490e",
                border: "2px solid #09490e",
                color: "#fbfada",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
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
      <div className="container-fluid p-4 bg-custom-yellow pb-5"> {/* Cambiado a container-fluid */}
        {/* Título */}
        <h1 className="h2 mb-4"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#000",
          }}>
          Piedra del Indio via Quebrada Quintero</h1>

        {/* Sección superior: Estrellas, distancia, dificultad y tiempo */}
        <div className="d-flex gap-3 mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "18px" }}>
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

        {/* Sección de imágenes */}
        <div className="row align-items-start">
          {/* Columna para la imagen principal */}
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741555998/foto_16_u2gk1m.jpg"
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
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#fbfada";
                  e.target.style.color = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#fbfada";
                }}
                onClick={goToGallery}
              >
                Ver más
              </button>
            </div>
          </div>

          {/* Columna para las imágenes 2 y 3 */}
          <div className="col-md-3 d-flex flex-column gap-3">
            <img
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741556001/foto_17_qhvttn.jpg"
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
              src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1741556033/foto_18_teebyd.jpg"
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
            <p className
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
                color: "#000",
                lineHeight: "1.6",
                textAlign: "justify",
              }}>
              Explora un recorrido de 6,3 km con dificultad media y una duración
              aproximada de 2 horas y 38 minutos. Disfruta de senderos rodeados
              de exuberante vegetación, cascadas cristalinas y miradores naturales.
            </p>
            <button
              className="btn btn-primary align-self-center"
              style={{
                backgroundColor: "#09490e",
                border: "2px solid #09490e",
                color: "#fbfada",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "20px",
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
    </div>
  );
};

export default Destination;