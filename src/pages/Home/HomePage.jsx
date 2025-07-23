import { useDispatch, useSelector } from 'react-redux';
import '../../css/HomePage.css';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
import RegisterComponent from '../../components/RegisterComponent/RegisterComponent';
import { changeHomeViewAction } from '../../components/HomePageComponent/HomePageComponentActions';
import logo from '../../assets/logo.png';
import SessionInitiate from '../../components/SessionInitiate/SessionInitiate';

const HomePage = () => {
  const dispatch = useDispatch();

  const viewType = useSelector(
    (state) => state.homePageComponentReducer.viewTypeHome
  );

  const handlerViewOption = (option) => {
    dispatch(
      changeHomeViewAction({
        viewTypeHome: option,
      })
    );
  };

  return (
    <>
      <div className="body-container">
        <div className="home-container">
          <div className="info-home-container">
            <img className="logo-home" src={logo} alt="" />
            <h2>Tu espacio para comprar y vender con confianza</h2>
            <p>
              Compra y vende productos de segunda mano con facilidad.
              <br />
              ¿Tienes algo que ya no usas? ¡Dale una segunda vida!.
              <br />
              <br />
              En <b>SecondHand Hub</b> conectamos personas reales que quieren
              dar una nueva oportunidad a sus objetos. Publica tus productos,
              chatea con otros usuarios, encuentra lo que necesitas… todo en una
              plataforma segura, sencilla y 100% pensada para ti.
              <br />
              <br />
              Seguro, rápido y sin complicaciones.
            </p>
          </div>
          <div className="info-links-log-reg-container">
            <div className="info-logreg-background">
              {viewType === 'LOG' ? (
                <LoginComponent />
              ) : viewType === 'REG' ? (
                <RegisterComponent />
              ) : (
                <div className="info-links-buttons-container">
                  <button
                    className="btn-to-login"
                    onClick={() => handlerViewOption('LOG')}
                  >
                    Hacer login
                  </button>
                  <p>ó</p>
                  <button
                    className="btn-to-register"
                    onClick={() => handlerViewOption('REG')}
                  >
                    Crear tu cuenta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
