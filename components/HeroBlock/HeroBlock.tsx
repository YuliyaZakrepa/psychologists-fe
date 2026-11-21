import Image from "next/image";
import heroImage from "@/public/hero_img.jpg";
import css from "./HeroBlock.module.css";
import Link from "next/link";
import Icon from "../Icon/Icon";
export default function HeroBlock() {
  return (
    <div className={css.mainSection}>
      <div className={`container ${css.heroContainer}`}>
        <div className={css.heroTextContainer}>
          <h1 className={css.title}>
            The road to the <span>depths</span> of the human soul
          </h1>
          <p className={css.description}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <Link href="psychologists" className={css.link}>
            Get started
            <Icon name={"icon-Arrow"} className={css.icon}></Icon>
          </Link>
        </div>
        <div className={css.heroImgContainer}>
          <Image
            src={heroImage}
            alt="Camper van parked by a river at sunset"
            priority
            width={464}
            height={526}
            className={css.heroImage}
          />
          <div className={css.containerIconQuestion}>
            <Icon name={"icon-question"} className={css.iconQuestion}></Icon>
          </div>
          <div className={css.containerIconCheck}>
            <div className={css.iconContainer}>
              <Icon
                name={"icon-check"}
                className={css.iconCheck}
                size={30}
              ></Icon>
            </div>
            <div className={css.textContainer}>
              <p>Experienced psychologists</p>
              <span>15,000</span>
            </div>
          </div>
          <div className={css.containerIconUsers}>
            <Icon
              name={"icon-users"}
              className={css.iconUsers}
              size={20}
            ></Icon>
          </div>
        </div>
      </div>
    </div>
  );
}
