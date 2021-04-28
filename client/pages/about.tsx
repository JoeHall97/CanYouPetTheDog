// import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/about.module.css";

const AboutPage = () => (
	<Layout title='About | Can You Pet The Dog'>
		<h1>About</h1>
		<div className={styles.centertext}>
			<p className={styles.abouttext}>
				Have you ever been wondering if there was an objective way to measure a game's quality? Well wonder no
				more! This website allows you to enter in a games name and it will try and find out if you can pet the
				dog (or other animals) in the game, thus giving you an accurate measurement of a games quality.{" "}
			</p>
			<p className={styles.abouttext}>
				This site is built using NextJS, a React framework, and typescript. To find out whether you or not you
				can pet the dog in a given game, the site searches through the tweets of the{" "}
				<a href='https://twitter.com/CanYouPetTheDog'>"Can You Pet The Dog"</a> twitter account. If a relevant
				tweet is found, then it will be displayed.
			</p>
		</div>
	</Layout>
);

export default AboutPage;
