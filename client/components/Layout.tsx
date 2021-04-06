import React, { ReactNode } from "react";
import Head from "next/head";
//import styles from "../styles/Layout.module.css";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
	<div className="root">
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		{/*<header>
			<div style={{ width: "100%", alignContent: "center" }}>
				<nav>
					<Typography variant="h4" align="center">
						<Link href="/">
							<a className={styles.navItem}>Home</a>
						</Link>{" "}
						|{" "}
						<Link href="/about">
							<a className={styles.navItem}>About</a>
						</Link>
					</Typography>
				</nav>
			</div> 
		</header> */}
		{children}
	</div>
);

export default Layout;
