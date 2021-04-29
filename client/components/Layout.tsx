import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Layout.module.css";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props): JSX.Element => (
	<div style={{ width: "100%" }}>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<header>
			<nav>
				<Link href="/">
					<a className={styles.navlink}>Home</a>
				</Link>
				{"    "}|{"    "}
				<Link href="/about">
					<a className={styles.navlink}>About</a>
				</Link>
			</nav>
		</header>
		{children}
		<footer>
			This site was created by <a href="https://joehall.co.nz">Joseph Hall</a>
		</footer>
	</div>
);

export default Layout;
