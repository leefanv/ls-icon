import styles from "./Cards.module.scss";

import Card from "./Card";

function Cards({ children }) {
  return <div className={styles.cards}>{children}</div>;
}

Cards.Card = Card;

export default Cards;
