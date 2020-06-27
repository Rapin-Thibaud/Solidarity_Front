import React, { Component } from "react";

/**
 * @component
 * @description page accessible depuis le panneau adminstrateur servant à supprimer un utilisateur
 */
class Delusers extends Component {

  /**
   * @description Les informations pouvant être remplies sous la forme [nom] = valeur
   */
  static infos = {};

  /**
   * @function
   * @description Prend en charge les changements des différents inputs de la page
   * @param {Event} event passé automatiquement et permet d'accéder aux valeurs des inputs
   * @callback
   */
  static handleChange(event) {
    Delusers.infos[event.target.name] = event.target.value;
  }

  /**
   * @function
   * @description Fonction appelée lors de la confirmation et l'envoie du formulaire rempli (ici le nouveau message)
   * @param {MouseEvent} event qui permet d'obtenir des informations sur l'envoie du formulaire
   * @callback
   */
  static handleSubmit(event) {
    fetch("http://localhost:3000/api/users/"+Delusers.infos["name"], {method: "DELETE"}).then((res)=>{
      alert("User supprimé");
    });
  }

  render() {
    return (
      <div>
        <h1>Supprimer</h1>
        <h2>Veuillez renseigner les informations nécessaires :</h2>
        Entrez l'email : <input type="text" name="name" onChange={Delusers.handleChange} /> <br />
        <input type="submit" name="valider" value="Supprimer" onClick={Delusers.handleSubmit} />
      </div>
    );
  }
}

export default Delusers;
