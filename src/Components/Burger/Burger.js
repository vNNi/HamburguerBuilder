import React from "react";
import PropTypes from "prop-types";

import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = props => {
  //essa funcao torna nosso array de ingredients flat, ou seja, deixa de ser um array de arrays para mapear, para ser um single array
  function flattenDeep(arr1) {
    return arr1.reduce(
      (acc, val) =>
        Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
      []
    );
  }

  const transformedIngredients = flattenDeep(
    Object.keys(props.ingredients).map(keys => {
      // pegando todas as keys do objeto e criando um array contendo a quantidade de ingredients dado na propriedade de cada objeto
      return [...Array(props.ingredients[keys])].map((_, i) => {
        // criando um ingrediente para cada item no array criado acima e utilizando a key que está no map anterior
        return <BurgerIngredients key={keys + i} type={keys} />;
      });
    })
  );
  return (
    <div className={classes.Burger}>
      {transformedIngredients > 0 ? (
        <>
          <BurgerIngredients type="bread-top" />
          {transformedIngredients}
          <BurgerIngredients type="bread-bottom" />
        </>
      ) : (
        <p>Por favor passe ingredientes !</p>
      )}
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default Burger;
