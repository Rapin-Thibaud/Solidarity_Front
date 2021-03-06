import * as React from "react";
import jsSHA from "jssha";

/**
 * @component
 * @description Page permettant à se connecter en tant qu'un utilisateur enregistré
 */
class Connexion extends React.Component {
  /**
   * @description Les informations pouvant être remplies sous la forme [nom] = valeur
   */
  static state = {};

  /**
   * @function
   * @description Prend en charge les changements des différents inputs de la page
   * @param {Event} event passé automatiquement et permet d'accéder aux valeurs des inputs
   * @callback
   */
  static handleChange(event) {
    Connexion.state[event.target.name] = event.target.value;
  }

  /**
   * @function
   * @description Fonction appelée lors de la confirmation et l'envoie du formulaire rempli (ici le nouveau message)
   * @param {MouseEvent} event qui permet d'obtenir des informations sur l'envoie du formulaire
   * @callback
   */
  static handleSubmit(event) {
    event.preventDefault();
    if (Connexion.state["email"].indexOf("@") === -1) return;
    fetch("http://localhost:3000/api/users/" + Connexion.state["email"])
      .then((res) => res.json())
      .then((result) => {
        if (result["type"] !== undefined) {
          alert("L'identifiant ou le mot de passe est incorrect");
          return;
        }
        var authkey = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
        authkey.update(Connexion.state["password"]);
        var passHash = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
        passHash.update(authkey.getHash("HEX"));
        passHash.update("connexion");

        fetch(
          "http://localhost:3000/api/authentificate/" +
          result["ID"] +
          "?token=" +
          passHash.getHash("HEX")
        )
          .then((res) => res.json())
          .then((authresult) => {
            if (authresult["type"] === "error") {
              alert("L'identifiant ou le mot de passe est incorrect");
              return;
            }

            document.cookie = JSON.stringify({"user": Connexion.state["email"]});

            alert("Connexion réussi !");
            window.location.assign("..");

          });
      });
  }

  /**
   * @function
   * @description Permet de rediriger vers la page d'enregistrement
   */
  static redirectToRegister() {
    window.location.assign("./register");
  }

  render() {
    return (
      <div className="connexion">
        <form className="form-signin" onSubmit={Connexion.handleSubmit}>
          <div className="text-center mb-4">
            <img
              className="mb-4"
              src="http://www.walkingelephant.info/wp-content/uploads/2018/01/icon-loupe-150x150.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 font-weight-normal">Solidarity Connexion</h1>
            <p>
              Pour vous connecter a votre compte, veuillez renseigner votre
              identifiant et votre mot de passe
            </p>
          </div>

          <div className="form-label-group">
            <input
              type="email"
              id="inputEmail"
              name="email"
              className="form-control"
              placeholder="Email address"
              required={true}
              onChange={Connexion.handleChange}
            />
            <label htmlFor="inputEmail">Email address</label>
          </div>

          <div className="form-label-group">
            <input
              type="password"
              id="inputPassword"
              name="password"
              className="form-control"
              placeholder="Password"
              required={true}
              onChange={Connexion.handleChange}
            />
            <label htmlFor="inputPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                id="inputRemember"
                name="remember"
                value="remember-me"
                onChange={Connexion.handleChange}
              />{" "}
              Se souvenir de moi
            </label>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={Connexion.connection}
          >
            Connexion
          </button>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={Connexion.redirectToRegister}
          >
            S'inscrire
          </button>
        </form>
      </div>
    );
  }
}

export default Connexion;
