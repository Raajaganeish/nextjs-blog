import Image from "next/image";
import styles from "./hero.module.css";
function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src={"/images/site/dp.jpg"}
          alt={"I'm DP"}
          width={300}
          height={300}
        />
      </div>
      <h1>I am DeadPool!</h1>
      <p>
        Deadpool is a fictional character appearing in American comic books
        published by Marvel Comics. Created by writer Fabian Nicieza and
        artist/writer Rob Liefeld, the character first appeared in The New
        Mutants #98 (cover-dated Feb. 1991).
      </p>
    </section>
  );
}

export default Hero;
